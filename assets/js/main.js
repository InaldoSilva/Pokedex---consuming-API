const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadLessButton = document.getElementById("loadLessButton");

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  /*Add zeros before numbers < 100*/
  let zeroBeforeNumber;
  if (pokemon.number < 10) {
    zeroBeforeNumber = "#00" + pokemon.number;
  } else if (pokemon.number >= 10 && pokemon.number < 100) {
    zeroBeforeNumber = "#0" + pokemon.number;
  } else {
    zeroBeforeNumber = "#" + pokemon.number;
  }

  return `<a class="linkCard" href="./pokemon_card.html?id=${pokemon.number}">
   <li class="pokemon ${pokemon.type}">
   <span class="number">${zeroBeforeNumber}</span>
   <span class="name">${pokemon.name}</span>
   
    <div class="detail">
      <ol class="types">
        <li class="type"></li>
        <li class="type"></li>
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>    
  </li>
   `;
}

/*Paginação*/

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

console.log("total = ", offset + limit);