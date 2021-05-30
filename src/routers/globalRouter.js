import express from "express"
import { Trending, Join, Login, Search } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get('/', Trending);
globalRouter.get('/join',Join);
globalRouter.get('/login',Login);
globalRouter.get('/search', Search);

export default globalRouter;