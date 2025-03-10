import express from 'express';
import { setEntity } from "../middleware/testimonialMiddleware.js";
import { getAllPlans } from "../controllers/planController.js";

const router = express.Router();

router.use(setEntity);

router.get('/', getAllPlans);

export default router;
