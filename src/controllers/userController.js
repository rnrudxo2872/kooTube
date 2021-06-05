import User from "../models/User";
import bcrypt from "bcrypt"

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
    const {name, username, email, password, password2, location} = req.body;
    const exists = await User.exists({$or :[{username},{email}]});

    if(password !== password2){
        return res.render("join",{
            pageTitle:"Join",
            errorMessage:"비밀번호가 다릅니다."
        })
    }

    if(exists){
        return res.status(400).render("join",{pageTitle:"Join", errorMessage:"이미 있는 아이디거나 이메일 입니다."})
    }
    try{
        await User.create({
            email,
            username,
            password,
            name,
            location
        });
        res.redirect("/login")
    }catch(err){
        return res.status(400).render("join",{pageTitle:"Join", errorMessage:err._message})
    }

;}

export const getLogin = (req,res) =>{
    res.render("login", {pageTitle:"Login"})
}

export const postLogin = async(req,res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).render("login",{pageTitle:"Login", errorMessage:"아이디가 존재하지 않습니다!"});
    }
    console.log(user);
    console.log(password ,user.password);
    const ok = await bcrypt.compare(password ,user.password);

    if(!ok){
        return res.status(400).render("login",{pageTitle:"Login", errorMessage:"비밀번호가 틀립니다!"});
    }

    console.log("User Login : ", user.email);
    res.redirect("/");
}