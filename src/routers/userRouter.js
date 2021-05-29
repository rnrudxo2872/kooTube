import express from "express"
import { userDelete, userEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/delete', userDelete)
userRouter.get('/edit', userEdit)

export default userRouter;