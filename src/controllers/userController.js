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