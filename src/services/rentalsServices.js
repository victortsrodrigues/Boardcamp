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

const rentalsServices = {
  getRentals,
};

export default rentalsServices;
