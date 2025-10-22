import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status-codes";
import config from "../../config";
import { prisma } from "../../config/db";
export const CheckRole =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization || req.cookies.accessToken;

      if (!token) {
        throw new Error("Unauthenticated user");
      }

      const tokenVerify: jwt.JwtPayload = jwt.verify(
        token,
        config.jwt_secret_key || "secret"
      ) as jwt.JwtPayload;
      console.log(tokenVerify);
      if (!tokenVerify) {
        throw new Error("Admin verification failed for token");
      }

      const isUserExist = await prisma.user.findUnique({
        where: {
          email: tokenVerify.email,
        },
      });

      if (!isUserExist) {
        throw new Error("Email not exist");
      }

      if (!authRole.includes(tokenVerify.role)) {
        throw new Error("Unauthenticated user");
      }
      req.user = tokenVerify;
      next();
    } catch (error) {
      next(error);
    }
  };
