import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
import { prisma } from "../../../config/db";
import { Request } from "express";
import uploadToCloudinary from "../../utils/cloudinary";
import { Doctor } from "@prisma/client";

const getAllUsers = async () => {
  const result = await prisma.user.findMany();

  const totalUser = await prisma.user.count();

  return { data: result, meta: { total: totalUser } };
};

const createPatient = async (req: Request) => {
  // console.log(req.body);
  // console.log(req.file);
  const {
    patient: { name, email },
    password,
  } = req.body;

  if (!name || !email || !password) {
    throw new Error("name, email and password are required");
  }
  if (req.file) {
    const imageUploadResult = await uploadToCloudinary(req.file);
    console.log(imageUploadResult);
    req.body = { ...req.body, image: imageUploadResult?.secure_url };
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

const createDoctor = async (req: Request) => {
  const { doctor, password } = req.body;
  const {
    name,
    email,
    contactNumber,
    address,
    registrationNumber,
    experience,
    gender,
    appointmentFee,
    qualification,
    currentWorkingPlace,
    designation,
  } = doctor as Doctor;

  if (!email) {
    throw new Error("email is required");
  }
  if (!password) {
    throw new Error("password is required");
  }
  if (!name) {
    throw new Error("name is required");
  }
  if (!contactNumber) {
    throw new Error("contactNumber is required");
  }
  if (!address) {
    throw new Error("address is required");
  }
  if (!registrationNumber) {
    throw new Error("registrationNumber is required");
  }
  if (!experience) {
    throw new Error("experience is required");
  }
  if (!gender) {
    throw new Error("gender is required");
  }
  if (!appointmentFee) {
    throw new Error("appointmentFee is required");
  }
  if (!qualification) {
    throw new Error("qualification is required");
  }
  if (!currentWorkingPlace) {
    throw new Error("currentWorkingPlace is required");
  }
  if (!designation) {
    throw new Error("designation is required");
  }

  if (req.file) {
    const imageUploadResult = await uploadToCloudinary(req.file);
    console.log(imageUploadResult);
    req.body = { ...req.body, profilePhoto: imageUploadResult?.secure_url };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "DOCTOR",
      },
    });

    const doctorCreate = await tx.doctor.create({
      data: { ...doctor, profilePhoto: req.body.profilePhoto },
    });

    return doctorCreate;
  });
  return result;
};

const createAdmin = async (req: Request) => {
  const {
    admin: { name, email, contactNumber },
    password,
  } = req.body;

  if (!name || !email || !contactNumber || !password) {
    throw new Error("name, email, contactNumber and password are required");
  }

  if (req.file) {
    const imageUploadResult = await uploadToCloudinary(req.file);
    console.log(imageUploadResult);
    req.body = { ...req.body, profilePhoto: imageUploadResult?.secure_url };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    const adminCreate = await tx.admin.create({
      data: { name, email, contactNumber, profilePhoto: req.body.profilePhoto },
    });

    return adminCreate;
  });
  return result;
};

export const userService = {
  createPatient,
  getAllPatients,
  getAllUsers,
  createDoctor,
  createAdmin,
};
