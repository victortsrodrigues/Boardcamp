import { db } from "../database/db.js";

async function getRentals() {
  const rentals =
    await db.query(`SELECT r.*, c.name AS "customerName", g.name AS "gameName"
	FROM rentals r
	JOIN customers c ON r."customerId" = c.id
	JOIN games g ON r."gameId" = g.id;`);
  return rentals.rows;
}

async function createRental(
  {customerId,
  gameId,
  rentDate,
  daysRented,
  returnDate,
  originalPrice,
  delayFee}
) {
  const newRental = await db.query(
    `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    [
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
    ]
  );
  return newRental;
}

const rentalsRepository = {
  getRentals,
  createRental,
};

export default rentalsRepository;
