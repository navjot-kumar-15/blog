import geoip from "geoip-lite";
import prisma from "../PrismaClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { error_response, success_response } from "../lib/utils.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "24h" });
}

// Register user
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

    // Checking the user
    const isCheck = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isCheck) {
      return res.send({
        success: 0,
        message: "Invalid credentials...",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const details = {
      name,
      email,
      image: image || "",
      password: hashPass,
      phoneNumber,
      ipAddress,
      location,
    };

    const newUser = await prisma.user.create({
      data: details,
    });

    success_response([], "User register successfully", res);
  } catch (error) {
    error_response(error, res);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};
