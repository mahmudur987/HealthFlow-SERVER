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
router.get(
  "/",
  CheckRole(UserRole.DOCTOR),
  DoctorScheduleController.getAllSchedulesOfDoctor
);
router.delete(
  "/delete",
  CheckRole(UserRole.DOCTOR),
  DoctorScheduleController.deleteScheduleFromDB
);
export const doctorScheduleRoutes = router;
