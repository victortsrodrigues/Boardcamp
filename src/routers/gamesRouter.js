import { Router } from "express";
import gamesController from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { gameSchema } from "../models/gamesModel.js";

const gamesRouter = Router();
gamesRouter.post("/games", validateSchema(gameSchema), gamesController.createGame);
gamesRouter.get("/games", gamesController.getGames);

export default gamesRouter;