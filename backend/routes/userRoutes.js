import express from "express";
import { fileUpload } from "../middleware/imageUpload.js";
import { authToken } from "../middleware/authToken.js";
import { userSignUp, userLogin, getUser, updateRole } from "../controller/userController.js";

const router = express.Router();

router.post("/sign-up", userSignUp);
router.post("/login", userLogin);

router.get("/", authToken, getUser);
router.post("/update-role", updateRole);

export default router;