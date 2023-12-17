const axios = require('axios');
const { formatNumberWith4Digits } = require('./parsingFunctions');

// Make a GET request

async function getPokemonNumberByName(pokemonName) {
return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => {
    // Handle the successful response
    return(formatNumberWith4Digits(response.data.id))
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
})};

module.exports = {
    getPokemonNumberByName
};