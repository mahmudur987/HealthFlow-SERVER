import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAdminZodSchema,
  creteDoctorZodSchema,
  cretePatientZodSchema,
} from "./user.validate";
import { multerUpload } from "../../utils/multer";
import { CheckRole } from "../../middlewares/verifyAuth";
import { UserRole } from "@prisma/client";

const router = Router();
router.get("/all-users", CheckRole(UserRole.ADMIN), userController.getAllUsers);
router.post(
  "/create-patient",
  multerUpload.single("file"),
  validateRequest(cretePatientZodSchema),
  userController.createPatient
);
router.post(
  "/create-doctor",
  multerUpload.single("file"),
  validateRequest(creteDoctorZodSchema),
  userController.createDoctor
);
router.post(
  "/create-admin",
  multerUpload.single("file"),
  validateRequest(createAdminZodSchema),
  userController.createAdmin
);
router.get("/all-patients", userController.getAllPatients);

export const userRoute = router;
