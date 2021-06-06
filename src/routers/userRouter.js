import express from "express"
import { finishGithubLogin, startGithubLogin, userDelete, userDetail, userEdit, userLogout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/delete', userDelete);
userRouter.get('/edit', userEdit);
userRouter.get('/logout', userLogout);
userRouter.get('/:id(\\d+)', userDetail);
userRouter.get('/github/start', startGithubLogin)
userRouter.get('/github/finish',finishGithubLogin)

export default userRouter;