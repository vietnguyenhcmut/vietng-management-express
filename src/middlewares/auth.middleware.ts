import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

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
    req.user = { role: decoded.role, userId: decoded.userId };
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;

  if (userRole === Role.ADMIN) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Yêu cầu quyền Admin." });
  }
};

export const isAdminOrManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRole = req.user?.role;
  if (userRole === Role.ADMIN || userRole === Role.MANAGER) {
    next();
  } else {
    return res.status(403).json({
      message:
        "Forbidden: Yêu cầu quyền Admin hoặc Manager. Bạn không có quyền truy cập.",
    });
  }
};
