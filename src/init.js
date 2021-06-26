import "regenerator-runtime/runtime.js";
import "dotenv/config"
import "./db"
import "./models/User"
import "./models/Video"
import app from "./server"

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => console.log(`App listen now ${PORT}!!`));