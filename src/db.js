import mongoose from "mongoose";

//mongo db 설정  /[db이름]
mongoose.connect("mongodb://127.0.0.1:27017/mytube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;

const handleErrorDB = (err) => console.log("DB Error", err);
const handleOpenDB = () => console.log("🔅 mongoDB 연결!")

//on 여러번, once 한번
db.on("error", handleErrorDB);
db.once("open", handleOpenDB);