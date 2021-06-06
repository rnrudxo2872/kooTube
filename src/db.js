import mongoose from "mongoose";

//mongo db 설정  /[db이름]
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
})

const db = mongoose.connection;

const handleErrorDB = (err) => console.log("DB Error", err);
const handleOpenDB = () => console.log("🔅 mongoDB 연결!")

//on 여러번, once 한번
db.on("error", handleErrorDB);
db.once("open", handleOpenDB);