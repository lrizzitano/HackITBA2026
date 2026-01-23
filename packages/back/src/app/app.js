import express from "express";
import cors from "cors";
import router from "./rutas.js"

export default async function aplication() {

    const app = express()
    app.use(express.json())

    app.use(cors({
        origin:"http://loalhost3000",
        methods: ["GET","POST","PUT","DELETE","PATCH"],
        allowedHeaders:["Content-Type","Authorization"]
    }))
    
    app.use("/",router)

    return app;
}   