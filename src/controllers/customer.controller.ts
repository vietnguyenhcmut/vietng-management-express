import { Request, Response } from "express";
import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../services/customer.service";

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const customerId = req.customerId;
    if (!customerId) {
      return res
        .status(401)
        .json({ message: "Không tìm thấy thông tin xác thực." });
    }

    const profile = await getCustomerProfile(customerId);
    if (!profile) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hồ sơ khách hàng." });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy thông tin hồ sơ." });
  }
};

export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const customerId = req.customerId;
    if (!customerId) {
      return res
        .status(401)
        .json({ message: "Không tìm thấy thông tin xác thực." });
    }

    const updatedProfile = await updateCustomerProfile(customerId, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Không thể cập nhật hồ sơ." });
  }
};
