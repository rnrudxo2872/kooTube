import { VideoCreatError } from "../errors/errorHandle";
import Video from "../models/Video"
import User from "../models/User";

export const home = async(req,res) =>{
    const videos = await Video.find({}).sort({createdAt:-1}).populate("owner");
    res.render("home",{pageTitle : "Home", videos});
}

export const videoWatch = async(req,res) =>{

    const {id} = req.params;
    const video = await Video.findById(id).populate("owner");

    if(video)
        return res.render('watch',{pageTitle: video.title, video})
    
    return res.render("404",{pageTitle:"Video not found"});
}

export const videoUpload = (req,res) =>{
    res.send("videoUpload");
}

export const getVideoEdit = async(req,res) =>{
    const {
        params:{
            id
        },
        session:{
            user:{
                _id
            }
        }
    } = req;

    const video = await Video.findById(id);

    //Forbidden
    if(String(video.owner) !== String(_id))
        return res.status(403).redirect("/");
    if(video)
        return res.render("editVideo",{pageTitle:`Editing ${video.title}`, video});
    return res.status(404).render("404",{pageTitle:"Video not found"})
}

export const postVideoEdit = async(req,res) =>{
    const {
        params:{
            id
        },
        session:{
            user:{
                _id
            }
        },
        body:{
            title, 
            description, 
            hashtags
        }
    } = req;
    const video = await Video.exists({_id:id});

    //Forbidden
    if(String(video.owner) !== String(_id))
        return res.status(403).redirect("/");

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
        body:{
            title,
            description,
            hashtags
        },
        file:{
            //ES6 문법, req.file.path의 변수명을 fileURL로 한다.
            path:fileURL
        },
        session:{
            user:{
                _id
            }
        }
    } = req;

    try{
        const newVideo = await Video.create({
            title,
            description,
            fileURL,
            owner:_id,
            hashtags:Video.formatHastags(hashtags)
        })

        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();

        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).render('uploadVideo',{pageTitle:"Upload Video",errorMsg:err._message})
    }

}

export const deleteVideo = async(req,res) =>{
    const {
        params:{
            id
        },
        session:{
            user:{
                _id
            }
        }
    } = req;

    const video = await Video.findById(id);

    //Not Found Video
    if(!video)
        return res.status(404).render("404",{pageTitle:"Not Found Page"});

    //Forbidden
    if(String(video.owner) !== String(_id))
        return res.status(403).redirect("/");

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
        }).populate("owner")
    }
    return res.render("search",{pageTitle:"Search", videos})
}