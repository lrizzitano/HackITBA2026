import express from "express";
import getHealth from "../controllers/health.js";
import { getEvaluacion } from "../controllers/evaluacionController.js";
import  getTestData    from "../controllers/test.js"

const router = express.Router();

router.get("/health",getHealth);

router.get("/testData",getTestData);

app.get("/api/evaluacion", getEvaluacion);

export default router