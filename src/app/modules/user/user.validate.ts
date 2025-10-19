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
