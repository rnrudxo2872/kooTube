import express from "express"
import { Join, Login } from "../controllers/userController";
import { home } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get('/join',Join);
globalRouter.get('/login',Login);

export default globalRouter;