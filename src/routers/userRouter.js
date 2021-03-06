import express from "express"
import { finishGithubLogin, getChangePassword, getUserEdit, postChangePassword, postUserEdit, startGithubLogin, userDelete, userDetail, userLogout } from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get('/delete', protectorMiddleware, userDelete);
userRouter.route("/edit").all(protectorMiddleware).get(getUserEdit).post(avatarUpload.single("avatar"),postUserEdit);
userRouter.get('/logout', protectorMiddleware, userLogout);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin)
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin)
userRouter.get('/:id([a-f0-9]{24})', userDetail);
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

export default userRouter;