import { Router } from "express";
import { scheduleController } from "./schedule.controller";

const router = Router();
router.post("/create", scheduleController.insertScheduleIntoDB);
router.get("/", scheduleController.getSchedules);
export const scheduleRoute = router;
