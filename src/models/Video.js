import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String, required:true, trim:true, maxLength:80}, //= {type: String}
    description:{type:String, required:true, trim:true, minLength:20},
    fileURL:{type:String, required:true},

    //Date.now() 안하는 이유 => 이 해당 파일을 생성시 바로 시간을 구하기에 ()를 안붙임.
    //객체 생성시에만 함수가 실행되도록 ()를 안 붙인다.
    createdAt:{type:Date, required:true, default: Date.now},
    hashtags: [{type: String, trim:true}],
    meta:{
        views:{type:Number, default:0, required:true},
        rating:{type:Number, default:0, required:true}
    },
    owner:{type:mongoose.Schema.Types.ObjectId, required: true, ref:'User'}
});

videoSchema.static('formatHastags',function(hashtags){
    return hashtags.split(',').map(item => item.startsWith("#") ? item : `#${item}`);
})

const VideoModel = mongoose.model("Video", videoSchema);
export default VideoModel;