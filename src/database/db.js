import mongoose from "mongoose";
import dotenv from "dotenv";


const env = dotenv.config().parsed;

const connection = () => {
    mongoose.connect(env.url, {
        dbName: env.dbName
    });

    const conn = mongoose.connection;
    conn.once("error", console.error.bind(console, "connection error"));
    conn.once("open", () => console.log(`database connected to ${env.dbName}`));
}


export default connection;