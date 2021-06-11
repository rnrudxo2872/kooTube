import multer from "multer";

export const localsMiddleware = (req, res, next) =>{
    console.log(req.session);

    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "NewTube";
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectorMiddleware = (req,res,next) =>{
    if(req.session.loggedIn)
        return next();
    return res.redirect("/login");
};

export const publicOnlyMiddleware = (req,res,next) =>{
    if(!req.session.loggedIn)
        return next();
    return res.redirect("/")
}

//3M
export const avatarUpload = multer({dest:"upload/avatars/", limits:{fileSize:3000000}})

//10M
export const videoUpload = multer({dest:"upload/videos/", limits:{fileSize:10000000}})