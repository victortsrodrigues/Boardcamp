import { conflictError } from "../errors/conflictError.js";
import gamesRepository from "../repositories/gamesRepository.js";

async function getGames() {
  const games = await gamesRepository.getGames();
  return games;
}

async function createGame({ name, image, stockTotal, pricePerDay }) {
  const gameExists = await gamesRepository.searchGameByName(name);
  if (gameExists.rowCount !== 0) throw conflictError("A game with this name");
  
  const newGame = gamesRepository.createGame(
    name,
    image,
    stockTotal,
    pricePerDay
  );
  return newGame;
}

const gamesServices = {
  createGame,
  getGames,
};

export default gamesServices;
