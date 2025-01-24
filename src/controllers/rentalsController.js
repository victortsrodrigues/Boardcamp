import rentalsServices from "../services/rentalsServices.js";

async function getRentals(req, res) {
  const rentals = await rentalsServices.getRentals();
  res.status(200).send(rentals);
}

async function createRental(req, res) {
  const newRental = await rentalsServices.createRental(req.body);
  res.status(201).send("Created");
}

const rentalsController = {
  getRentals,
  createRental
};

export default rentalsController;
