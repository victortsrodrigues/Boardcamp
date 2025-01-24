import rentalsServices from "../services/rentalsServices.js";

async function getRentals(req, res) {
  const rentals = await rentalsServices.getRentals();
  res.status(200).send(rentals);
}

async function createRental(req, res) {
  await rentalsServices.createRental(req.body);
  res.status(201).send("Created");
}

async function finishRental(req, res) {
  await rentalsServices.finishRental(req.params);
  res.status(200).send("Ok");
}

async function deleteRental(req, res) {
  await rentalsServices.deleteRental(req.params);
  res.status(200).send("Ok");
}

const rentalsController = {
  getRentals,
  createRental,
  finishRental,
  deleteRental,
};

export default rentalsController;
