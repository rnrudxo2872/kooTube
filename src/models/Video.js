import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String, //= {type: String}
    description:String,
    createdAt:Date,
    hashtags: [{type: String}],
    meta:{
        views:Number,
        rating:Number
    }
});

const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;