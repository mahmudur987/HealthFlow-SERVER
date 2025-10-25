import express from "express";
import { userRoute } from "../modules/user/user.routes";
import { authRoute } from "../modules/auth/auth.route";
import { scheduleRoute } from "../modules/schedule/schedule.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
