import { notFoundError } from "../errors/notFoundError.js";
import { stockError } from "../errors/stockError.js";
import customersRepository from "../repositories/customersRepository.js";
import gamesRepository from "../repositories/gamesRepository.js";
import rentalsRepository from "../repositories/rentalsRepository.js";

async function getRentals() {
  const rentals = await rentalsRepository.getRentals();
  console.log(rentals);
  const newRentals = rentals.map((element) => {
    return {
      ...element,
      customer: {
        id: element.customerId,
        name: element.customerName,
      },
      game: {
        id: element.gameId,
        name: element.gameName,
      },
    };
  });
  newRentals.forEach((element) => {
    delete element.customerName;
    delete element.gameName;
  });
  return newRentals;
}

async function createRental({ customerId, gameId, daysRented }) {
  const game = await gamesRepository.searchGameById(gameId);
  if (game.rowCount === 0) throw notFoundError("Game");
  if (game.rows[0].stockTotal === 0) throw stockError("Game");

  const customer = await customersRepository.searchCustomerById(customerId);
  if (customer.rowCount === 0) throw notFoundError("Customer");

  const { pricePerDay } = game.rows[0];

  const body = {
    customerId: customerId,
    gameId: gameId,
    rentDate: new Date().toISOString().split("T")[0],
    daysRented: daysRented,
    returnDate: null,
    originalPrice: daysRented * pricePerDay,
    delayFee: null,
  };
  console.log(body)
  const newRental = await rentalsRepository.createRental(body);
  return newRental;
}

const rentalsServices = {
  getRentals,
  createRental,
};

export default rentalsServices;
