import { finishRentalError } from "../errors/finishRentalError.js";
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
  console.log(body);
  const newRental = await rentalsRepository.createRental(body);
  return newRental;
}

async function finishRental({ id }) {
  const rental = await rentalsRepository.searchRentalById(id);
  if (rental.rowCount === 0) throw notFoundError("Rental");
  const currentRental = rental.rows[0];
  if (currentRental.returnDate !== null) throw finishRentalError("Rental");
  console.log(currentRental);

  // Creating a new Date object to avoid modifying the original
  const expectedReturnDate = new Date(currentRental.rentDate);
  expectedReturnDate.setUTCDate(
    expectedReturnDate.getUTCDate() + currentRental.daysRented
  );
  const currentDate = new Date();
  let delayDays = 0;
  let delayFee = null;
  if (currentDate > expectedReturnDate) {
    const diffTime = currentDate.getTime() - expectedReturnDate.getTime();
    delayDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    console.log(delayDays);

    const game = await gamesRepository.searchGameById(currentRental.gameId);
    if (game.rowCount === 0) throw notFoundError("Game");

    console.log(game.rows[0]);
    delayFee = game.rows[0].pricePerDay * delayDays;
  }
  console.log(delayFee);
  const returnDate = new Date().toISOString().split("T")[0];
  const updatedRental = await rentalsRepository.updateFinishRental(
    returnDate,
    delayFee,
    id
  );
  console.log(updatedRental);
  return updatedRental;
}

const rentalsServices = {
  getRentals,
  createRental,
  finishRental,
};

export default rentalsServices;
