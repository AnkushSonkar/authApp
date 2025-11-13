import express from "express";
import auth_middleware from "../middleware/auth_middleware.js";
import { signupContoller } from "../controller/signupContoller.js";
import { loginController } from "../controller/loginController.js";
import { homeController } from "../controller/homeController.js";
import { logoutController } from "../controller/logoutController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupContoller);
router.get("/home", auth_middleware, homeController);
router.post("/logout", auth_middleware, logoutController);

export default router;
