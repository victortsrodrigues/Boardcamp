import { Router } from "express";
import rentalsController from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", rentalsController.getRentals);

export default rentalsRouter;