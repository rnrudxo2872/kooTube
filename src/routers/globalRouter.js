import express from "express"

const globalRouter = express.Router();

const RootFunc = (req,res) => res.send("global Home");
globalRouter.get("/",RootFunc);

export default RootFunc;