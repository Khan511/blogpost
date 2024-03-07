import express from "express";
import { Test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", Test);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
