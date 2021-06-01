import express from "express"
import {
    getVideoEdit,
    videoWatch,
    postVideoEdit,
    getUploadVideo,
    postUploadVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get('/:id(\\d+)', videoWatch);
videoRouter.route('/:id(\\d+)/edit').get(getVideoEdit).post(postVideoEdit);
videoRouter.route('/upload').get(getUploadVideo).post(postUploadVideo);

export default videoRouter;