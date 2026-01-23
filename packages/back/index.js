import express from "express"
import aplication from "./src/app/app.js"
import "dotenv/config";

const app = await aplication();
app.use(express.json());
app.listen(process.env.SERVER_PORT,() => {
    console.log(`Origenes permitidos = ${process.env.ALLOWED_ORIGINS}`)
    console.log(`Escuchando en puerto = ${process.env.SERVER_PORT}`)
})