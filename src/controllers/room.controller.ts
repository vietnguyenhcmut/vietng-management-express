import { Request, Response } from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../services/room.service";

export const fetchAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms." });
  }
};

export const fetchRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await getRoomById(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room." });
  }
};

export const createNewRoom = async (req: Request, res: Response) => {
  try {
    const newRoom = await createRoom(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create room." });
  }
};

export const updateExistingRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRoom = await updateRoom(id, req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Failed to update room." });
  }
};

export const deleteExistingRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteRoom(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete room." });
  }
};
