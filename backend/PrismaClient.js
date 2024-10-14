// src/prismaClient.js

import { PrismaClient } from "@prisma/client";

let prisma;

// Check if the environment is production or not
if (process.env.NODE_ENV === "production") {
  // In production, create a new instance of PrismaClient
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to store the instance
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Function to connect to the database and log success message
async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

connectPrisma();

export default prisma;
