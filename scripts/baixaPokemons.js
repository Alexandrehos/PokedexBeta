let htmlElement = document.querySelector("#pokemonList");

generatePage();

async function generatePage() {
  if (localStorage.length == 0) {
    generateCards(await savePokemon(10));
  } else {
    Object.keys(localStorage).forEach(function (key) {
      card(JSON.parse(localStorage[key]));
    });
  }
}

function generateCards(arrPokemons) {
  for (pokemon of arrPokemons) {
    card(pokemon);
  }
}

async function savePokemon(qty) {
  const arrOut = [];
  const arrPokemons = returnUniqueRandom(qty);
  let count = 0;
  for await (let i of arrPokemons) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const JSONOut = await response.json();
    const pokemon = {
      name: JSONOut.name,
      image: JSONOut.sprites.front_default,
      height: JSONOut.height,
      weight: JSONOut.weight,
      id: `P${count}`,
    };
    arrOut.push(pokemon);
    localStorage.setItem(`P${count}`, JSON.stringify(pokemon));
    count++;
  }
  return arrOut;
}

function removePokemon(id) {
  localStorage.removeItem(id);
  document.location.reload(true);
}

function returnUniqueRandom(qty) {
  const arrOut = [];
  for (let i = 0; i < qty; i++) {
    let randomNumber = Math.floor(Math.random() * 151);
    if (arrOut.includes(randomNumber)) {
      i--;
      continue;
    }
    arrOut.push(randomNumber);
  }
  return arrOut;
}

function card(pokemon) {
  htmlElement.innerHTML += `<div class="card">
        <div class="namePokemon">${pokemon.name}</div>
        <div class="PokemonPicture"><img src="${pokemon.image}" alt="" /></div>
        <div class="pokemonStats">
          <div class="statsType">
            <div>
              <p class="statsName">Altura</p>
            </div>
            <div class="statsValue">${pokemon.height}</div>
          </div>
          <div class="statsType">
            <div>
              <p class="statsName">Peso</p>
            </div>
            <div class="statsValue">${pokemon.weight}</div>
          </div>
        </div>
        <div class="removeButton">
          <button onclick="removePokemon('${pokemon.id}')">Remover</button>
        </div>
      </div>`;
}

// Adam
// 2204290095
