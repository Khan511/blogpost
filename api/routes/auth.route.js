import express from "express";
import SignUp, { Google, SignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/google", Google);

export default router;
