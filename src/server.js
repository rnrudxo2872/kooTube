import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"

const app = express();
const logger = morgan("dev");

console.log(process.cwd());

app.set('views',process.cwd()+'/src/views');
app.set('view engine','pug')
app.set('x-powered-by',false);

//morgan next() 포함
app.use(logger);
app.use(express.urlencoded({extended:true}))

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;