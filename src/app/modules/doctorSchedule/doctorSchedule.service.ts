import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../config/db";
import { pick } from "../../utils/pick";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { email, string } from "zod";

export interface IJWTPayload extends JwtPayload {}
const insertIntoDB = async (
  user: IJWTPayload,
  payload: {
    scheduleIds: string[];
  }
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};

const getAllSchedulesOfDoctor = async (
  user: JwtPayload,
  query: Record<string, string>
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
    isBooked: status,
    startDateTime,
    endDateTime,
    id,
  } = pick(query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "isBooked",
    "startDateTime",
    "endDateTime",
    "id",
  ]);
  console.log(user);
  const skip = (Number(page) - 1) * Number(limit);
  const andConditions = [];

  if (status) {
    andConditions.push({
      isBooked: Boolean(status),
    });
  }
  if (user.role === UserRole.DOCTOR) {
    andConditions.push({
      doctor: {
        email: user.email,
      },
    });
  }

  if (startDateTime && endDateTime) {
    andConditions.push({
      schedule: {
        AND: [
          {
            startDateTime: {
              gte: new Date(startDateTime),
            },
          },
          {
            endDateTime: {
              lte: new Date(endDateTime),
            },
          },
        ],
      },
    });
  }
  const whereConditions =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};
  const result = await prisma.doctorSchedules.findMany({
    where: { ...whereConditions },
    include: {
      schedule: true,
      doctor: true,
    },
    skip,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const count = await prisma.doctorSchedules.count({
    where: { ...whereConditions },
  });
  return {
    meta: {
      total: count,
      page,
      limit,
    },
    data: result,
  };
};

const deleteScheduleFromDB = async (query: Record<string, any>) => {
  const { scheduleId, doctorId } = pick(query, ["scheduleId", "doctorId"]);

  if (!scheduleId) {
    throw new Error("Schedule id is required at query ");
  }
  if (!doctorId) {
    throw new Error("Doctor id is required at query ");
  }

  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorId,
        scheduleId: scheduleId,
      },
    },
  });
  return result;
};

export const DoctorScheduleService = {
  insertIntoDB,
  getAllSchedulesOfDoctor,
  deleteScheduleFromDB,
};
