import express, { json } from "express";
import "express-async-errors"
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routers/gamesRouters.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(gamesRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
