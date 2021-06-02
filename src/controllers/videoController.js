import { VideoCreatError } from "../errors/errorHandle";
import Video, { formatHastags } from "../models/Video"

export const home = async(req,res) =>{
    const videos = await Video.find({});
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
    return res.render("404",{pageTitle:"Video not found"})
}

export const postVideoEdit = async(req,res) =>{
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id:id});

    if(!video)
        return res.render("404",{pageTitle:"Not Found Page"});
    
        await Video.findByIdAndUpdate(id,{
            title,
            description,
            hashtags:formatHastags(hashtags)
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

    try{
        await Video.create({
            title,
            description,
            hashtags:formatHastags(hashtags)
        })
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.render('uploadVideo',{pageTitle:"Upload Video",errorMsg:err._message})
    }

}