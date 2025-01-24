import gamesServices from "../services/gamesServices.js";

async function getGames(req, res) {
  const games = await gamesServices.getGames();
  res.status(200).send(games);
}

async function createGame(req, res) {
  const newGame = await gamesServices.createGame(req.body);
  res.status(201).send("Created");
}

const gamesController = {
  getGames,
  createGame,
};

export default gamesController;
