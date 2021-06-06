import "dotenv/config"
import "./db"
import "./models/User"
import "./models/Video"
import app from "./server"

const PORT = 4000;

app.listen(PORT,() => console.log(`App listen now ${PORT}!!`));