import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
dotenv.config();

async function connectDB() {
  const adminEmail = "admin@gmail.com";
  const adminPass = "123456";
  const hashed = await bcrypt.hash(adminPass, 10);
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  console.log("connectDB");
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
      },
    });
    console.log(`Seeded admin -> ${adminEmail} / ${adminPass}`);
  } else {
    console.log("Admin already exists, skipping seed.");
  }
}

export default connectDB;
