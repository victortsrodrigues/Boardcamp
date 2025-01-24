import { db } from "../database/db.js";

async function getGames() {
  const games = await db.query(`SELECT * FROM games;`);
  return games.rows;
}

async function searchGameByName(name) {
  const gameExists = await db.query(`SELECT * FROM games WHERE name=$1;`, [
    name,
  ]);
  return gameExists;
}

async function searchGameById(id) {
  const game = await db.query(`SELECT * FROM games WHERE id=$1;`, [id]);
  return game;
}

async function createGame(name, image, stockTotal, pricePerDay) {
  const newGame = await db.query(
    `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
    [name, image, stockTotal, pricePerDay]
  );
  return newGame;
}

const gamesRepository = {
  createGame,
  searchGameByName,
  getGames,
  searchGameById,
};

export default gamesRepository;
