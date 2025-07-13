"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // De lay Bearer <token>
    if (!token)
        return res.sendStatus(401).json({ message: "Yêu cầu cần token xác thực" }); // Unauthorized
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = { userId: decoded.userId };
        next();
    }
    catch (err) {
        console.log(err);
        return res
            .status(403)
            .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};
exports.authenticateToken = authenticateToken;
