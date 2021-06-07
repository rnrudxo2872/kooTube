import express from "express"
import { finishGithubLogin, getUserEdit, postUserEdit, startGithubLogin, userDelete, userDetail, userLogout } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get('/delete', protectorMiddleware, userDelete);
userRouter.route("/edit").all(protectorMiddleware).get(getUserEdit).post(postUserEdit);
userRouter.get('/logout', protectorMiddleware, userLogout);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin)
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin)
userRouter.get('/:id(\\d+)', userDetail);

export default userRouter;