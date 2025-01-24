import { conflictError } from "../errors/conflictError.js";
import { notFoundError } from "../errors/notFoundError.js";
import customersRepository from "../repositories/customersRepository.js";

async function getCustomers() {
  const customers = await customersRepository.getCustomers();
  return customers;
}

async function getCustomerById({ id }) {
  const customer = await customersRepository.searchCustomerById(id);
  if (customer.rowCount === 0) throw notFoundError("Customer");
  
  return customer.rows[0];
}

async function createCustomer({ name, phone, cpf }) {
  const customerExists = await customersRepository.searchCustomerByCPF(cpf);
  if (customerExists.rowCount !== 0)
    throw conflictError("A customer with this cpf");

  const newCustomer = await customersRepository.createCustomer(
    name,
    phone,
    cpf
  );
  return newCustomer;
}

const customersServices = {
  getCustomers,
  createCustomer,
  getCustomerById,
};

export default customersServices;
