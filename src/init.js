import "regenerator-runtime/runtime.js";
import "dotenv/config"
import "./db"
import "./models/User"
import "./models/Video"
import app from "./server"

const PORT = process.env.SERVER_PORT;

app.listen(PORT,() => console.log(`App listen now ${PORT}!!`));