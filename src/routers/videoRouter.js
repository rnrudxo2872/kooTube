import express from "express"
import { videoDelete, videoWatch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get('/delete', videoDelete)
videoRouter.get('/watch', videoWatch)

export default videoRouter;