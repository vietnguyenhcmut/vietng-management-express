import express from "express";
import {
  createNewRoom,
  deleteExistingRoom,
  fetchAllRooms,
  fetchRoomById,
  updateExistingRoom,
} from "../controllers/room.controller";
import {
  authenticateToken,
  isAdmin,
  isAdminOrManager,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", fetchAllRooms);
router.get("/:id", fetchRoomById);

router.post("/", authenticateToken, isAdmin, createNewRoom);
router.delete("/:id", authenticateToken, isAdmin, deleteExistingRoom);
router.put("/:id", authenticateToken, isAdminOrManager, updateExistingRoom);

export default router;
