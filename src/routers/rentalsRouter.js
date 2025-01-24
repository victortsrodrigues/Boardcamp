import { Router } from "express";
import rentalsController from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { rentalSchema } from "../models/rentalsModel.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", rentalsController.getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), rentalsController.createRental)

export default rentalsRouter;