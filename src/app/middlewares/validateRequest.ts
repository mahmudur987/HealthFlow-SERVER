import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateRequest =
  (zodSchema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    try {
      if (req.body.data) {
        req.body = await zodSchema.parseAsync(JSON.parse(req.body.data));
        console.log(req.body, "validated in if");
      } else if (req.body) {
        req.body = await zodSchema.parseAsync(req.body);
        console.log(req.body, "validated in else");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
export default validateRequest;
