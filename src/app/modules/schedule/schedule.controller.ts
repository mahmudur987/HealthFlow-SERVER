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

const getSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.getSchedules();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedules fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const scheduleController = { insertScheduleIntoDB, getSchedules };
