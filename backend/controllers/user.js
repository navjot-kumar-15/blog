import geoip from "geoip-lite";
import prisma from "../PrismaClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import {
  deleting_image,
  error_response,
  invalid_response,
  success_response,
} from "../lib/utils.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "24h" });
}

// Register user
export const registerUser = async (req, res) => {
  const imagePath = req.file ? `/user/avatar/${req.file.filename}` : null;
  const filePath = req.file ? `uploads/user/avatar/${req.file.filename}` : null;
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
    if (!isCheck) {
      deleting_image(filePath);
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
      image: imagePath || "",
      password: hashPass,
      phoneNumber,
      ipAddress,
      location,
    };

    const newUser = await prisma.user.create({
      data: details,
    });

    success_response(res, "User register successfully", []);
  } catch (error) {
    deleting_image(filePath);
    error_response(res, error.message);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return invalid_response(res, "Please enter all the required fields");
    }

    // Check if user exists
    const isUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isUser) {
      return invalid_response(res, "Invalid credentials...");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, isUser.password);
    if (!isPasswordValid) {
      return invalid_response("Invalid credentials...", res);
    }

    // Update user's active status
    await prisma.user.update({
      where: { email },
      data: { isActive: true },
    });

    // Generate token
    const token = generateToken(isUser.id);

    // Send success response
    return success_response(res, "User logged in successfully", { token });
  } catch (error) {
    return error_response(res, error.message);
  }
};
