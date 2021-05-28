import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter"

const app = express();
const PORT = 4000;
const logger = morgan("dev");

//morgan next() 포함
app.use(logger);

app.get('/',globalRouter);

app.listen(PORT,() => console.log(`App listen now ${PORT}!!`));