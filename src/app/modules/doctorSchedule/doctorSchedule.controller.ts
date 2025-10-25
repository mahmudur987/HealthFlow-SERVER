import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DoctorScheduleService, IJWTPayload } from "./doctorSchedule.service";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  }
);

const getAllSchedulesOfDoctor = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.getAllSchedulesOfDoctor(
      user as IJWTPayload,
      req.query as Record<string, string>
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedules fetched successfully",
      meta: result.meta as Record<string, number>,
      data: result.data,
    });
  }
);
const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorScheduleService.deleteScheduleFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});
export const DoctorScheduleController = {
  insertIntoDB,
  getAllSchedulesOfDoctor,
  deleteScheduleFromDB,
};
