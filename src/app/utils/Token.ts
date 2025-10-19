import jwt from "jsonwebtoken";

export const generateToken = (payload: any) => {
  const secretKey = process.env.JWT_SECRET_KE || "secret";
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "30d" });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET_KE || "secret";
  return jwt.verify(token, secretKey);
};
