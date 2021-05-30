const videos = [
    {
        title: "video #1",
        rating:4,
        comments:51,
        createdAt:"1시간전",
        views:123
    },
    {
        title: "나의 작은 새",
        rating:2,
        comments:0,
        createdAt:"1시간전",
        views:123
    },
    {
        title: "휘파람",
        rating:1,
        comments:1023,
        createdAt:"1시간전",
        views:1023
    }
]

export const Trending = (req,res) =>{
    res.render("home",{pageTitle : "Home", videos});
}
export const Join = (req,res) =>{
    res.send("join")
}
export const Login = (req,res) =>{
    res.send("login")
}
export const Search = (req,res) =>{
    res.send("search");
}