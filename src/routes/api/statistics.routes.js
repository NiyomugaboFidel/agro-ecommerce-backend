import { Router } from "express";
import { Statistics } from "../../controllers/statistics.controller";

const router = Router();

router.get("/",Statistics)


export default router;