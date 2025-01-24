import { Router } from "express";
import customersController from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { customerSchema } from "../models/customersModel.js";

const customersRouter = Router();

customersRouter.get("/customers", customersController.getCustomers);
customersRouter.get("/customers/:id", customersController.getCustomerById);
customersRouter.post("/customers", validateSchema(customerSchema), customersController.createCustomer);

export default customersRouter;
