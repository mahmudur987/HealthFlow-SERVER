import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { cretePatientZodSchema } from "./user.validate";
import { multerUpload } from "../../utils/multer";

const router = Router();
router.get("/all-users", userController.getAllUsers);
router.post(
  "/create-patient",
  multerUpload.single("file"),
  validateRequest(cretePatientZodSchema),
  userController.createPatient
);
router.get("/all-patients", userController.getAllPatients);

export const userRoute = router;
