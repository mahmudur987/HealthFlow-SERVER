import { profile } from "console";
import { z } from "zod";

export const cretePatientZodSchema = z.object({
  password: z.string({
    error: "password is required",
  }),
  patient: z.object({
    name: z.string({
      error: "name is required",
    }),
    email: z.email({
      error: "email is required",
    }),
    address: z.string().optional(),
  }),
});

export const creteDoctorZodSchema = z.object({
  password: z.string({
    error: "password is required",
  }),
  doctor: z.object({
    name: z.string({
      error: "name is required",
    }),
    email: z.email({
      error: "email is required",
    }),
    profilePhoto: z.string().optional(),
    contactNumber: z.string({
      error: "contactNumber is required",
    }),
    address: z.string({
      error: "address is required",
    }),

    registrationNumber: z.string({
      error: "registrationNumber is required",
    }),
    experience: z.number({
      error: "experience is required",
    }),
    gender: z.string({
      error: "gender is required",
    }),
    appointmentFee: z.number({
      error: "appointmentFee is required",
    }),
    qualification: z.string({
      error: "qualification is required",
    }),
    currentWorkingPlace: z.string({
      error: "currentWorkingPlace is required",
    }),
    designation: z.string({
      error: "designation is required",
    }),
  }),
});

export const createAdminZodSchema = z.object({
  password: z.string({
    error: "password is required",
  }),
  admin: z.object({
    name: z.string({
      error: "name is required",
    }),
    email: z.email({
      error: "email is required",
    }),
    profilePhoto: z.string().optional(),
    contactNumber: z.string({
      error: "contactNumber is required",
    }),
  }),
});
