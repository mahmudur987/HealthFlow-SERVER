import express from "express";
import { userRoute } from "../modules/user/user.routes";
import { authRoute } from "../modules/auth/auth.route";
import { scheduleRoute } from "../modules/schedule/schedule.route";
import { doctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.routes";
import { SpecialtiesRoutes } from "../modules/specialties/specialties.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/schedule",
    route: scheduleRoute,
  },
  {
    path: "/doctorSchedule",
    route: doctorScheduleRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: "DoctorRoutes",
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
