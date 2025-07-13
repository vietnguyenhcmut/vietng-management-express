"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controllers/room.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/", room_controller_1.fetchAllRooms);
router.get("/:id", room_controller_1.fetchRoomById);
router.post("/", auth_middleware_1.authenticateToken, room_controller_1.createNewRoom);
router.put("/:id", auth_middleware_1.authenticateToken, room_controller_1.updateExistingRoom);
router.delete("/:id", auth_middleware_1.authenticateToken, room_controller_1.deleteExistingRoom);
exports.default = router;
