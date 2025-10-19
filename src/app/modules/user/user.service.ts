import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
import { prisma } from "../../../config/db";
import { Request } from "express";
import uploadToCloudinary from "../../utils/cloudinary";

const getAllUsers = async () => {
  const result = await prisma.user.findMany();

  const totalUser = await prisma.user.count();

  return { data: result, meta: { total: totalUser } };
};

const createPatient = async (req: Request) => {
  const {
    patient: { name, email },
    password,
  } = req.body;
  if (req.file) {
    const imageUploadResult = await uploadToCloudinary(req.file);
    console.log(imageUploadResult);
    req.body = { ...req.body, image: imageUploadResult?.secure_url };
  }

  if (!name || !email || !password) {
    throw new Error("name, email and password are required");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const patient = await tx.patient.create({
      data: {
        name,
        email,
        profilePhoto: req.body.image,
      },
    });

    return patient;
  });
  return result;
};

const getAllPatients = async () => {
  const result = await prisma.patient.findMany();
  return result;
};

export const userService = { createPatient, getAllPatients, getAllUsers };
