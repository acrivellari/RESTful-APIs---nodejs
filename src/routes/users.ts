import { Router } from "express";
import { getUserInfo, login } from "../controllers/users";

const router = Router();

router.get("/", getUserInfo);
router.post("/login", login);


export default router;