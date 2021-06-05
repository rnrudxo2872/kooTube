import express from "express";
import morgan from "morgan";
import session from "express-session"
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import { localsMiddleware } from "./middlewares";

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
    secret:"Hellow",
    resave: true,
    saveUninitialized: true
}))
app.use(express.static(__dirname + '/public'));

app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;