import jwt from "jsonwebtoken";
import config from "../../config";

export const generateToken = (payload: any) => {
  const accessToken = jwt.sign(payload, config.jwt_secret_key || "secret", {
    expiresIn: config.jwt_expires_in || "1d",
  });
  const refreshToken = jwt.sign(payload, config.jwt_refresh_key || "secret", {
    expiresIn: config.jwt_refresh_expires_in || "30d",
  });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET_KE || "secret";
  return jwt.verify(token, secretKey);
};
