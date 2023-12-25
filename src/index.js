import express, { urlencoded } from "express";
import dotenv from "dotenv"
import router from "./routers/api.js"
import connection from "./database/db.js";
import AuthController from "./controllers/AuthController.js";

const env = dotenv.config().parsed;


const app = express();
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use('/', router)

app.use((req, res) => {
    res.status(404).json({ message: "404_NOT_FOUND" })
})

connection();

app.listen(env.SERVER_PORT, () => {
    console.log(`app listening at http://localhost:${env.SERVER_PORT}`)
})