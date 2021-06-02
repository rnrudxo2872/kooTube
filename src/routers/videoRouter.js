import express from "express"
import {
    getVideoEdit,
    videoWatch,
    postVideoEdit,
    getUploadVideo,
    postUploadVideo,
    deleteVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', videoWatch);
videoRouter.route('/:id([0-9a-f]{24})/edit').get(getVideoEdit).post(postVideoEdit);
videoRouter.get('/:id([0-9a-f]{24})/delete',deleteVideo)
videoRouter.route('/upload').get(getUploadVideo).post(postUploadVideo);

export default videoRouter;