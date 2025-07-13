import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const getCustomerProfile = async (id: string) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      createdAt: true,
    },
  });
  return customer;
};

export const updateCustomerProfile = async (
  id: string,
  data: Prisma.CustomerUpdateInput
) => {
  const { password, ...updatableData } = data;

  const updatedCustomer = await prisma.customer.update({
    where: { id },
    data: updatableData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
    },
  });
  return updatedCustomer;
};
