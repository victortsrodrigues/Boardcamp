import { db } from "../database/db.js";

async function getRentals() {
  const rentals =
    await db.query(`SELECT r.*, c.name AS "customerName", g.name AS "gameName"
	FROM rentals r
	JOIN customers c ON r."customerId" = c.id
	JOIN games g ON r."gameId" = g.id;`);
  return rentals.rows;
}

async function searchRentalById(id) {
  const rental = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
  return rental;
}

async function createRental({
  customerId,
  gameId,
  rentDate,
  daysRented,
  returnDate,
  originalPrice,
  delayFee,
}) {
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

async function updateFinishRental(returnDate, delayFee, id) {
  const updatedRental = await db.query(
    `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`,
    [returnDate, delayFee, id]
  );
  return updatedRental;
}

const rentalsRepository = {
  getRentals,
  createRental,
  searchRentalById,
  updateFinishRental,
};

export default rentalsRepository;
