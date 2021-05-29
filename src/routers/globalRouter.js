import express from "express"
import { Trending, Join, Login } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get('/', Trending);
globalRouter.get('/join',Join);
globalRouter.get('/login',Login)

export default globalRouter;