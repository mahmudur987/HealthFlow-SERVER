import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";

import { UserRole } from "@prisma/client";
import { CheckRole } from "../../middlewares/verifyAuth";

const router = express.Router();

router.post(
  "/",
  CheckRole(UserRole.DOCTOR),
  DoctorScheduleController.insertIntoDB
);

export const doctorScheduleRoutes = router;
