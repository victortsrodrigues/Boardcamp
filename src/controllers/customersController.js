import customersServices from "../services/customersServices.js";

async function getCustomers(req, res) {
  const customers = await customersServices.getCustomers();
  res.status(200).send(customers);
}

async function getCustomerById(req, res) {
  const customer = await customersServices.getCustomerById(req.params);
  res.status(200).send(customer);
}

async function createCustomer(req, res) {
  const newCustomer = await customersServices.createCustomer(req.body);
  res.status(201).send("Created");
}

const customersController = {
  getCustomers,
  createCustomer,
  getCustomerById
};

export default customersController;
