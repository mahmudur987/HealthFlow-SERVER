import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient created successfully",
    data: "result",
  });
});

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllPatients();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patients fetched successfully",
    data: result,
  });
});

export const userController = { createPatient, getAllPatients, getAllUsers };
