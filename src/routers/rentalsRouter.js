import { Router } from "express";
import rentalsController from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { rentalSchema } from "../models/rentalsModel.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", rentalsController.getRentals);
rentalsRouter.post(
  "/rentals",
  validateSchema(rentalSchema),
  rentalsController.createRental
);
rentalsRouter.post("/rentals/:id/return", rentalsController.finishRental);
rentalsRouter.delete("/rentals/:id", rentalsController.deleteRental);

export default rentalsRouter;
