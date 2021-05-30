import express from "express"
import { userDelete, userDetail, userEdit, userLogout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/delete', userDelete);
userRouter.get('/edit', userEdit);
userRouter.get('/logout', userLogout);
userRouter.get('/:id(\\d+)', userDetail);

export default userRouter;