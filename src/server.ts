import express, { Express, Request, Response } from "express";
import cors from "cors";
import userAuthRoutes from "./routes/user.auth.route";
import userRoutes from "./routes/user.route";
import roomRoutes from "./routes/room.route";
import customerRoutes from "./routes/customer.route";
import customerAuthRoutes from "./routes/customer.auth.route";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DQP Cloud Server is running on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is the VietNg Management System!");
});

app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/customer", customerAuthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/room", roomRoutes);
