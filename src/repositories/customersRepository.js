import { db } from "../database/db.js";

async function getCustomers() {
  const customers = await db.query(`SELECT * FROM customers;`);
  return customers.rows;
}

async function searchCustomerByCPF(cpf) {
  const customerExists = await db.query(
    `SELECT * FROM customers WHERE cpf=$1;`,
    [cpf]
  );
  return customerExists;
}

async function searchCustomerById(id) {
  const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
  return customer;
}

async function createCustomer(name, phone, cpf) {
  const newCustomer = await db.query(
    `INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3);`,
    [name, phone, cpf]
  );
  return newCustomer;
}

const customersRepository = {
  getCustomers,
  createCustomer,
  searchCustomerByCPF,
  searchCustomerById,
};

export default customersRepository;
