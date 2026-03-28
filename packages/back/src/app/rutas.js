import express from "express";
import getHealth from "../controllers/health.js";
import { getEvaluacion } from "../controllers/evaluacionController.js";

const router = express.Router();

router.get("/health",getHealth);
router.get("/evaluacion",getEvaluacion)

export default router