import { Router } from "express";
import { scheduleController } from "./schedule.controller";
import { CheckRole } from "../../middlewares/verifyAuth";
import { UserRole } from "@prisma/client";

const router = Router();
router.post("/create", scheduleController.insertScheduleIntoDB);
router.get(
  "/",
  CheckRole(UserRole.ADMIN, UserRole.DOCTOR),
  scheduleController.getDoctorSchedules
);
router.delete("/delete/:id", scheduleController.deleteScheduleFromDB);
export const scheduleRoute = router;
