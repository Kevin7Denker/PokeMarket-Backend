const axios = require("axios");
const url = require("./utils");

const AllPokemonData = async (req, res) => {
  try {
    const response = await axios.get(`${url}v2/pokemon?limit=100000&offset=0`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Pokemons Data", pokemonData });
  } catch (error) {
    console.error("Erro ao obter dados do Pokémon API", error);
  }
};

const getPokemonsByName = async (req, res) => {
  const { name } = req.body;

  if(!name){
    return res.status(422).json({ msg: "The name field is required" });
  }

  try {
    const response = await axios.get(`${url}v2/pokemon/${name}`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "Get Pokemon " + pokemonData.name, pokemonData });
  } catch (error) {
    console.log("Erro ao obter dados doPokemon API", error);
  }
};

const getPokemonsById = async (req, res) => {
  const { id } = req.body;

  if(!id){
    return res.status(422).json({ msg: "The id field is required" });
  }

  try {
    const response = await axios.get(`${url}v2/pokemon/${id}`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "Get Pokemon " + pokemonData.name, pokemonData });
  } catch (error) {
    console.log("Erro ao obter dados doPokemon API", error);
  }
};

module.exports = {
  AllPokemonData,
  getPokemonsByName,
  getPokemonsById
};
