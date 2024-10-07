import User from "../models/user.js";
import geoip from "geoip-lite";

export const registerUser = async (req, res) => {
  try {
    const { name, email, image, password, phoneNumber } = req.body;

    // Get the user's IP address
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const geo = geoip.lookup(ipAddress);
    const location = {
      longitude: geo ? geo.ll[0] : null,
      latitude: geo ? geo.ll[1] : null,
    };

    const details = {
      name,
      email,
      image,
      password,
      phoneNumber,
      loginDetails: {
        ipAddress,
        location,
      },
    };

    const newUser = await User.create(details);

    return res.send({
      success: 1,
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};
