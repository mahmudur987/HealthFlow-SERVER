import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../../config/db";
import { pick } from "../../utils/pick";
import { Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { id } from "zod/v4/locales";

const insertScheduleIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;
  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  // console.log(currentDate, lastDate);
  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]) // 11:00
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]) // 11:00
        ),
        Number(endTime.split(":")[1])
      )
    );
    console.log(startDateTime, endDateTime);
    while (startDateTime < endDateTime) {
      const slotStartDateTime = startDateTime; // 10:30
      const slotEndDateTime = addMinutes(startDateTime, intervalTime); // 11:00

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });

        schedules.push(result);
      }

      slotStartDateTime.setMinutes(
        slotStartDateTime.getMinutes() + intervalTime
      );
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getDoctorSchedules = async (
  query: Record<string, any>,
  user: JwtPayload
) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    startDateTime: filterStartDateTime,
    endDateTime: filterEndDateTime,
    id,
  } = pick(query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "startDateTime",
    "endDateTime",
    "id",
  ]);

  console.log(query);

  let skip: number = (Number(page) - 1) * Number(limit);
  const andConditions: Prisma.ScheduleWhereInput[] = [];

  if (filterStartDateTime && filterEndDateTime) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: filterStartDateTime,
          },
        },
        {
          endDateTime: {
            lte: filterEndDateTime,
          },
        },
      ],
    });
  }
  if (id) {
    andConditions.push({
      id: id,
    });
  }
  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
    select: {
      scheduleId: true,
    },
  });

  const doctorScheduleIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId
  );

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
    skip,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result.map((schedule) => schedule.id),
  };
};
const deleteScheduleFromDB = async (id: string) => {
  return await prisma.schedule.delete({
    where: {
      id,
    },
  });
};
export const scheduleService = {
  insertScheduleIntoDB,
  getDoctorSchedules,
  deleteScheduleFromDB,
};
