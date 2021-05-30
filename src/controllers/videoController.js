export const videoDelete = (req,res) =>{
    res.send("videoDel");
}

export const videoEdit = (req,res) =>{
    const reg = /nico\w+/g
    res.send(`${reg.exec('nicoef efwef')}`);
}

export const videoWatch = (req,res) =>{
    res.render('watch',{pageTitle: "Video Detail"})
}

export const videoUpload = (req,res) =>{
    res.send("videoUpload");
}