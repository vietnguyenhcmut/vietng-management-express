import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const getAllRooms = async () => {
  const rooms = await prisma.room.findMany({
    orderBy: {
      roomNumber: "asc",
    },
  });
  return rooms;
};

export const getRoomById = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
  });
  return room;
};

export const createRoom = async (data: Prisma.RoomCreateInput) => {
  const room = await prisma.room.create({
    data,
  });
  return room;
};

export const updateRoom = async (id: string, data: Prisma.RoomUpdateInput) => {
  const room = await prisma.room.update({
    where: { id },
    data,
  });
  return room;
};

export const deleteRoom = async (id: string) => {
  await prisma.room.delete({
    where: { id },
  });
};
