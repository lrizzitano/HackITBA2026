import express from "express";
import cors from "cors";
import router from "./rutas.js"
import path from 'path';
import { fileURLToPath } from 'url';





export default async function aplication() {

    const app = express()
    app.use(express.json())

    app.use(cors());

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // 1. Servir archivos estáticos (CSS, JS del front, imágenes)
    // El '../../public' depende de qué tan profundo esté este archivo
    app.use(express.static(path.join(__dirname, '../../public')));

    // 2. Ruta principal: Entrega el HTML cuando entres a la URL
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../public/index.html'));
    });


    /*
        app.use(cors({
            origin:"http://loalhost:3000",
            methods: ["GET","POST","PUT","DELETE","PATCH"],
            allowedHeaders:["Content-Type","Authorization"]
        }))*/

    app.use("/", router)

    return app;
}   