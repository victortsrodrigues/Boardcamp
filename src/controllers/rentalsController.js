import rentalsServices from "../services/rentalsServices.js";

async function getRentals(req, res) {
  const rentals = await rentalsServices.getRentals();
  res.status(200).send(rentals);
}

const rentalsController = {
  getRentals,
};

export default rentalsController;
