import { VideoCreatError } from "../errors/errorHandle";
import Video from "../models/Video"

export const home = async(req,res) =>{
    const videos = await Video.find({});
    console.log(videos);
    res.render("home",{pageTitle : "Home", videos});
}

export const videoWatch = (req,res) =>{
    const {id} = req.params;
    return res.render('watch',{pageTitle: `Watching `})
}

export const videoUpload = (req,res) =>{
    res.send("videoUpload");
}

export const getVideoEdit = (req,res) =>{
    const {id} = req.params;
    return res.render("editVideo",{pageTitle:`Editing `});
}

export const postVideoEdit = (req,res) =>{
    const {id} = req.params;
    const {title} = req.body;
    res.redirect(`/videos/${id}`);
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

    await Video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(',').map(item => `#${item}`),
        meta: {
            views: 0,
            rating: 0
        }
    }).catch(VideoCreatError);

    return res.redirect('/');
}