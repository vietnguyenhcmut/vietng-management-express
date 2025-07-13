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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield prisma_1.default.room.findMany({
        orderBy: {
            roomNumber: "asc",
        },
    });
    return rooms;
});
exports.getAllRooms = getAllRooms;
const getRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma_1.default.room.findUnique({
        where: { id },
    });
    return room;
});
exports.getRoomById = getRoomById;
const createRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma_1.default.room.create({
        data,
    });
    return room;
});
exports.createRoom = createRoom;
const updateRoom = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield prisma_1.default.room.update({
        where: { id },
        data,
    });
    return room;
});
exports.updateRoom = updateRoom;
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.room.delete({
        where: { id },
    });
});
exports.deleteRoom = deleteRoom;
