"use strict";

// Variables qSelector
const characterList = document.querySelector('.js_character_list');
const favoriteList = document.querySelector('.js-favorite-list');
const searchBtn = document.querySelector('.js_btn');
const searchInput = document.querySelector('.js_search');
const form = document.querySelector('.js_form');
const resetBtn = document.querySelector('.js_reset_btn');
//Variables

let allCharacters = [];
let favoritesCharacters = [];

//Funciones

function renderOneCharacter(character) {

  let classSelected = '';
  //busqueda para saber la posicion en favoritos si la tarjeta está en favoritos
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(character.char_id));
  //si la busqueda es -1 es decir que no lo encuentra, entonces lo añade 
  if (characterInFavsIndex === -1) {

    classSelected = '';
    console.log('hello');
    console.log('hello');
  }
  // si la busqueda da un index es que si lo encuentra y entonces, debe quitarlo
  else {
    console.log('gbye');
    classSelected = 'selected';
  }
  // atributo gancho char_id para poder trabajar luego con el currentTarget 
  let html = `<li>
    <article class="js_article ${classSelected} card" id="${character.char_id}">
    <span class="photobox">
      <img class="card_img"
        src="${character.img}"
        alt="characterImage">
        </span>
        <div class ="text">
          <h3 class="card_name">${character.name}</h3>
          <h3 class="card_status">${character.status}</h3>
        </div>
    </article>
    </li>`;
  return html;
}
function addCharacterListeners() {
  const allCards = document.querySelectorAll('.js_article');
  for (const eachCard of allCards) {
    eachCard.addEventListener('click', handleClick);
  }
}

function renderfavoriteCh() {
  let html = '';
  for (const eachCharacter of favoritesCharacters) {
    html += renderOneCharacter(eachCharacter);
  }
  favoriteList.innerHTML = html;
}

function renderAllCharacters(characters) {
  let html = '';
  for (const eachCharacter of characters) {
    html += renderOneCharacter(eachCharacter);
  }
  characterList.innerHTML = html;
  //por ser un qSAll nos dá un array
  const characterCard = document.querySelectorAll('.js_article');
  //para recorrer el array que genera el qSAll asigna con el bucle el evento
  /* for (const eachCard of characterCard) {
    eachCard.addEventListener('click', handleClick);
  } */
  addCharacterListeners();
}

addCharacterListeners();

function handleClick(event) {
  //evento para concretamente que el currentTarget sobre donde está el evento, 
  //en nuestro caso en cada tarjeta
  event.currentTarget.classList.toggle('selected');
  //busca en el array aquel objeto que tiene el mismo char_id  que el id parseado del current Target
  const selectedCh = allCharacters.find((charac) => charac.char_id === parseInt(event.currentTarget.id));

  //busqueda para saber la posicion en favoritos si la tarjeta está en favoritos
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(event.currentTarget.id));
  //si la busqueda es -1 es decir que no lo encuentra, entonces lo añade 
  if (characterInFavsIndex === -1) {
    //rellena el array de favoritos con lo qhe ha encontrado
    favoritesCharacters.push(selectedCh);

  }
  // si la busqueda da un index es que si lo encuentra y entonces, debe quitarlo
  else {
    favoritesCharacters.splice(characterInFavsIndex, 1);
  }
  localStorage.setItem('favoriteCharacter', JSON.stringify(favoritesCharacters));
  console.log(favoritesCharacters);
  renderfavoriteCh();

}
//Eventos
form.addEventListener('submit', (event) => {
  event.preventDefault();
})
searchBtn.addEventListener('click', () => {
  const userSearch = searchInput.value.toLowerCase();

  console.log(userSearch);
  //variable para meter los personajes que coincidan con la busqueda
  const filteredCharacters = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch));
  const filteredCharactersStatus = allCharacters.filter((eachCharacter) => eachCharacter.status.toLowerCase().includes(userSearch));
  ///////
  console.log(filteredCharacters);
  //pinta los personajes filtrados
  renderAllCharacters(filteredCharacters);
  renderAllCharacters(filteredCharactersStatus);

})

resetBtn.addEventListener("click", (event) => {
	event.preventDefault();
  favoritesCharacters = [];
  let html = '';
  favoriteList.innerHTML = html;
})


//código que que ejecuta al inicio de carga de la pagina

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data;
    renderAllCharacters(allCharacters);

  });

const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));

//despues de un get item hacemos un if para comprobar si hay o no algo en local storage
if (savedFavorites !== null) {
  favoritesCharacters = savedFavorites;
  renderfavoriteCh();
}
