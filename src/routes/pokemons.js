const express = require("express");
const route = express.Router();

const apiPokemons = require("../services/pokemons_services");
const apiGenerations = require("../services/generation_services");

route.get("/all", apiPokemons.AllPokemonData);

route.get("/kanto", apiGenerations.getKanto);
route.get("/johto", apiGenerations.getJohto);
route.get("/hoenn", apiGenerations.getHoenn);
route.get("/sinnoh", apiGenerations.getSinnoh);
route.get("/unova", apiGenerations.getUnova);
route.get("/kalos", apiGenerations.getKalos);

route.post("/byName", apiPokemons.getPokemonsByName);
route.post("/byId", apiPokemons.getPokemonsById);

module.exports = route;
