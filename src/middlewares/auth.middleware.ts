import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // De lay Bearer <token>

  if (!token)
    return res.sendStatus(401).json({ message: "Yêu cầu cần token xác thực" }); // Unauthorized
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload; // Verify token
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
