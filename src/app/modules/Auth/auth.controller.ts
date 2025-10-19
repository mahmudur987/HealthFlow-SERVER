import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../shared/sendResponse";

const logInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInUser(req.body);
  res.cookie("accessToken", result.accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", result.refreshToken, {
    secure: true,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const authController = { logInUser };
