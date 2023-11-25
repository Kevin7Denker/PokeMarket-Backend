const axios = require("axios");
const url = require("./utils");

const getKanto = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/1`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Kanto Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Kanto]", error);
  }
};

const getJohto = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/2`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Johto Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Johto]", error);
  }
};

const getHoenn = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/3`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Hoenn Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Hoenn]", error);
  }
};

const getSinnoh = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/4`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Sinnoh Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Sinnoh]", error);
  }
};

const getUnova = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/5`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Unova Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Unova]", error);
  }
};

const getKalos = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/6`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Kalos Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Kalos]", error);
  }
};

const getAlola = async (req, res) => {
  try {
    const response = await axios.get(`${url}/v2/generation/7`);
    const pokemonData = response.data;

    res
      .status(200)
      .json({ success: true, msg: "All Alola Pokemons", pokemonData });
  } catch (error) {
    console.error("Generation: [Alola]", error);
  }
};

module.exports = {
  getKanto,
  getJohto,
  getHoenn,
  getSinnoh,
  getUnova,
  getKalos,
  getAlola,
};
