"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExistingRoom = exports.updateExistingRoom = exports.createNewRoom = exports.fetchRoomById = exports.fetchAllRooms = void 0;
const room_service_1 = require("../services/room.service");
const fetchAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield (0, room_service_1.getAllRooms)();
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch rooms." });
    }
});
exports.fetchAllRooms = fetchAllRooms;
const fetchRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const room = yield (0, room_service_1.getRoomById)(id);
        if (!room) {
            return res.status(404).json({ message: "Room not found." });
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch room." });
    }
});
exports.fetchRoomById = fetchRoomById;
const createNewRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoom = yield (0, room_service_1.createRoom)(req.body);
        res.status(201).json(newRoom);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create room." });
    }
});
exports.createNewRoom = createNewRoom;
const updateExistingRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedRoom = yield (0, room_service_1.updateRoom)(id, req.body);
        res.status(200).json(updatedRoom);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update room." });
    }
});
exports.updateExistingRoom = updateExistingRoom;
const deleteExistingRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, room_service_1.deleteRoom)(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete room." });
    }
});
exports.deleteExistingRoom = deleteExistingRoom;
