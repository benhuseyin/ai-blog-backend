import jwt from "jsonwebtoken";

export const generateAccessToken = (data: Object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
