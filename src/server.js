import express from "express";
import morgan from "morgan";
import session from "express-session"
import MongoStore from "connect-mongo"
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

console.log(process.env.COOKIE_SECRET);
const app = express();
const logger = morgan("dev");

console.log(process.cwd());

app.set('views',process.cwd()+'/src/views');
app.set('view engine','pug')
app.set('x-powered-by',false);

//morgan next() 포함
app.use(logger);
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:300000,
    },
    store:MongoStore.create({mongoUrl:process.env.DB_URL})
}))
app.use(express.static(__dirname + '/public'));
app.use("/upload",express.static("upload"))
app.use("/static",express.static("assets"))

app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);
app.user('/api',apiRouter);

export default app;