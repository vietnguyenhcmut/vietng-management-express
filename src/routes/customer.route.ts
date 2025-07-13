import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/customer.controller";
import { authenticateCustomerToken } from "../middlewares/customer.auth.middleware";

const router = express.Router();

router.use(authenticateCustomerToken);

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);

export default router;
