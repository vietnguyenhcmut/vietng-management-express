import prisma from "../config/prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};
