const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonAltura = document.querySelector('.pokemon__altura--valor');
const pokemonPeso = document.querySelector('.pokemon__peso--valor');
const pokemonTipo1 = document.querySelector('.pokemon__tipo1');
const pokemonTipo2 = document.querySelector('.pokemon__tipo2');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Procurando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  
  pokemonImage.style.display = 'none';
  pokemonName.innerHTML = 'Não encontrado';
  pokemonNumber.innerHTML = '';
  pokemonAltura.innerHTML = '';
  pokemonPeso.innerHTML = '';
  pokemonTipo1.innerHTML = '';
  pokemonTipo2.innerHTML = '';
  
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    pokemonAltura.innerHTML = data.height;
    pokemonPeso.innerHTML = data.weight;
    const type1 = data.types[0];
    const type2 = data.types[1];
    pokemonTipo1.innerHTML = type1 ? type1.type.name : '';
    pokemonTipo2.innerHTML = type2 ? type2.type.name : '';
    searchPokemon = data.id;
  } 
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);