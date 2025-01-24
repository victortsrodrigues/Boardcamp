import { db } from "../database/db.js";

async function getRentals() {
  const rentals = await db.query(`SELECT r.*, c.name AS "customerName", g.name AS "gameName"
	FROM rentals r
	JOIN customers c ON r."customerId" = c.id
	JOIN games g ON r."gameId" = g.id;`);
  return rentals.rows;
}

const rentalsRepository = {
  getRentals,
};

export default rentalsRepository;
