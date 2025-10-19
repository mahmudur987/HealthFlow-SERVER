import { UserStatus } from "@prisma/client";
import { prisma } from "../../../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/Token";
const logInUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const { accessToken, refreshToken } = generateToken({
    email: user.email,
    id: user.id,
    role: user.role,
  });

  return { user, accessToken, refreshToken };
};
const logOutUser = async () => {};

export const authService = { logInUser, logOutUser };
