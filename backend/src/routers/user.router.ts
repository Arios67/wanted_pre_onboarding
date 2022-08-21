import express from "express";
import { UserService } from "../services/user.service";

const userRouter = express.Router();

// 입사 지원
userRouter.post("/apply", UserService.apply);

export default userRouter;
