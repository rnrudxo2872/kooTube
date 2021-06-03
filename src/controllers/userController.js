import User from "../models/User";

export const userDelete = (req,res) => {
    res.render("");
}

export const userEdit = (req,res) =>{
    res.send('userEdit')
}

export const userDetail = (req,res) =>{
    res.send('userDetail');
}

export const userLogout = (req,res) =>{
    res.send('userLogout');
}

export const getJoin = (req,res) =>{
    res.render("join",{pageTitle:"User Create"})
}

export const postJoin = async(req,res) =>{
    const {name, username, email, password, location} = req.body;
    await User.create({
        email,
        username,
        password,
        name,
        location
    });
    res.redirect("/login")
;}

export const Login = (req,res) =>{
    res.send("login")
}