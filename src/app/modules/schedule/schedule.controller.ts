import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { scheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";

const insertScheduleIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.insertScheduleIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const getDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.getDoctorSchedules(req.query, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedules fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.deleteScheduleFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const scheduleController = {
  insertScheduleIntoDB,
  getDoctorSchedules,
  deleteScheduleFromDB,
};
