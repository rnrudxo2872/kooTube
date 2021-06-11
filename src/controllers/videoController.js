import { VideoCreatError } from "../errors/errorHandle";
import Video from "../models/Video"

export const home = async(req,res) =>{
    const videos = await Video.find({}).sort({createdAt:-1});
    res.render("home",{pageTitle : "Home", videos});
}

export const videoWatch = async(req,res) =>{

    const {id} = req.params;
    const video = await Video.findById(id);
    if(video)
        return res.render('watch',{pageTitle: video.title, video})
    
    return res.render("404",{pageTitle:"Video not found"});
}

export const videoUpload = (req,res) =>{
    res.send("videoUpload");
}

export const getVideoEdit = async(req,res) =>{
    const {id} = req.params;
    const video = await Video.findById(id);
    if(video)
        return res.render("editVideo",{pageTitle:`Editing ${video.title}`, video});
    return res.status(404).render("404",{pageTitle:"Video not found"})
}

export const postVideoEdit = async(req,res) =>{
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id:id});

    if(!video)
        return res.status(404).render("404",{pageTitle:"Not Found Page"});
    
        await Video.findByIdAndUpdate(id,{
            title,
            description,
            hashtags:Video.formatHastags(hashtags)
        })
    return res.redirect(`/videos/${id}`);
}

export const getUploadVideo = (req,res) =>{
    return res.render("uploadVideo",{pageTitle:"Upload Video"});
}

export const postUploadVideo = async(req, res) => {
    const {
        title,
        description,
        hashtags
    } = req.body;

    //ES6 문법, req.file.path의 변수명을 fileURL로 한다.
    const {path:fileURL} = req.file;

    try{
        await Video.create({
            title,
            description,
            fileURL,
            hashtags:Video.formatHastags(hashtags)
        })
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).render('uploadVideo',{pageTitle:"Upload Video",errorMsg:err._message})
    }

}

export const deleteVideo = async(req,res) =>{
    const {id} = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async(req,res) => {
    const {keyword} = req.query;
    let videos = [];
    console.log(keyword);
    if(keyword){
        videos = await Video.find({
            title:{
                //i => 대소문자 구분X
                $regex: new RegExp(keyword, "i")
            }
        })
        console.log(videos); 
    }
    return res.render("search",{pageTitle:"Search", videos})
}