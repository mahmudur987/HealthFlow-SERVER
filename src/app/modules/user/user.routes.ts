import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { cretePatientZodSchema } from "./user.validate";
import { multerUpload } from "../../utils/multer";

const router = Router();

router.post(
  "/create-patient",
  multerUpload.single("file"),
  validateRequest(cretePatientZodSchema),
  userController.createPatient
);

export const userRoute = router;
