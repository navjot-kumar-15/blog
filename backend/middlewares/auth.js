import jwt from "jsonwebtoken";
import { error_response } from "../lib/utils.js";
import prisma from "../PrismaClient.js";

export const ProtectAuth = async (req, res, next) => {
  try {
    let token;
    let headers = req.headers;
    if (headers && headers.token) {
      token = headers.token;
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = await prisma.user.findUnique({
        where: {
          id: decode.id,
        },
      });
      if (req.user) {
        next();
      }
    } else {
      error_response(res, "No token provided.");
    }
  } catch (error) {
    console.log("Error :", error.message);
    // error_response(res, error.message);
  }
};
