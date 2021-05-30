import express from "express"
import { videoDelete, videoEdit, videoUpload, videoWatch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get('/upload', videoUpload);
videoRouter.get('/:id(\\d+)', videoWatch)
videoRouter.get('/:id(\\d+)/edit',videoEdit);
videoRouter.get('/:id(\\d+)/delete', videoDelete)

export default videoRouter;