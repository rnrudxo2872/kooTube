import express from "express"
import { getJoin, Login, postJoin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.get('/login',Login);
rootRouter.get('/search',search);

export default rootRouter;