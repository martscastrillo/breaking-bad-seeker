"use strict";

// Variables qSelector
const characterList = document.querySelector('.js_character_list');
const favoriteList = document.querySelector('.js-favorite-list');
const searchBtn = document.querySelector('.js_btn');
const searchInput = document.querySelector('.js_search');
const searchStatus = document.querySelector('.js_status');
const form = document.querySelector('.js_form');
const resetBtn = document.querySelector('.js_reset_btn');
const searchMessage = document.querySelector('.js_search_message');

//Variables

let allCharacters = [];
let favoritesCharacters = [];





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
  renderfavoriteCh();
}
function renderOneCharacter(character) {
  let classSelected = '';
  //busqueda para saber la posicion en favoritos si la tarjeta está en favoritos
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(character.char_id));
  //si la busqueda es -1 es decir que no lo encuentra, entonces lo añade 
  if (characterInFavsIndex === -1) {
    classSelected = '';
  }
  // si la busqueda da un index es que si lo encuentra y entonces, debe quitarlo
  else {
    classSelected = 'selected';
  }
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
function renderFAVCharacter(character) {
  let classSelected = '';
  let xFavorite = '';
  //busqueda para saber la posicion en favoritos si la tarjeta está en favoritos
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(character.char_id));
  //si la busqueda es -1 es decir que no lo encuentra, entonces lo añade 
  if (characterInFavsIndex === -1) {
    classSelected = '';
    xFavorite = '';
  }
  // si la busqueda da un index es que si lo encuentra y entonces, debe quitarlo
  else {
    classSelected = 'selectedfav';
    xFavorite = `<p class="xfavorite js_x_favorite" id="${character.char_id}">X</p>`;
  }
  // atributo gancho char_id para poder trabajar luego con el currentTarget 
  let html = `<li>
    <article class=" ${classSelected} card" id="${character.char_id}"> 
 ${xFavorite}
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
  //por ser un qSAll nos dá un array
  const allCards = document.querySelectorAll('.js_article');
  for (const eachCard of allCards) {
    eachCard.addEventListener('click', handleClick);
  }
}
function renderAllCharacters(characters) {
  let html = '';
  for (const eachCharacter of characters) {
    html += renderOneCharacter(eachCharacter);
  }
  characterList.innerHTML = html;
  addCharacterListeners();
}
addCharacterListeners();
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data;
    renderAllCharacters(allCharacters);
  });

function renderfavoriteCh() {

    let html = '';
    for (const eachCharacter of favoritesCharacters) {
        html += renderFAVCharacter(eachCharacter);
    }
    favoriteList.innerHTML = html;
    const xfavorite = document.querySelectorAll('.js_x_favorite');
    for (const onex of xfavorite) {
        onex.addEventListener('click', handleClickCancellFav);
    }
}

function handleClickCancellFav(event) {
    event.preventDefault();
    const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(event.currentTarget.id));

    favoritesCharacters.splice(characterInFavsIndex, 1);
    localStorage.removeItem('favoriteCharacter');
    renderfavoriteCh();
    localStorage.setItem('favoriteCharacter', JSON.stringify(favoritesCharacters));

    let char_id = event.currentTarget.id;
    const articles = document.getElementById(`${char_id}`);
    articles.classList.remove('selected');

}
form.addEventListener('submit', (event) => {
  event.preventDefault();
})
searchBtn.addEventListener('click', () => {
  const userSearch = searchInput.value.toLowerCase();
  const searchStatusValue = searchStatus.value;
  if (userSearch && (searchStatusValue !== 'All')) {
    const superfilter = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch)).filter((eachCharacter) => eachCharacter.status.includes(searchStatusValue));
    renderAllCharacters(superfilter);
    console.log(superfilter);
  }
  else if (userSearch) {
    //variable para meter los personajes que coincidan con la busqueda
    const filteredCharacters = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch));
    //pinta los personajes filtrados
    renderAllCharacters(filteredCharacters);
    searchMessage.innerHTML = '';
  }
  else if (searchStatusValue) {
    const filteredStatus = allCharacters.filter((eachCharacter) => {
      if (searchStatusValue === 'All') { //para forzale a darno contenido al render, de modo que siempre muestre todos
        return true;
      }
      else {
        return eachCharacter.status.includes(searchStatusValue);
      }
    });
    console.log(filteredStatus);
    renderAllCharacters(filteredStatus);
    searchMessage.innerHTML = '';
  }

})

const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));
//despues de un get item hacemos un if para comprobar si hay o no algo en local storage
if (savedFavorites !== null) {
  favoritesCharacters = savedFavorites;
  renderfavoriteCh();
}

resetBtn.addEventListener("click", (event) => {
	event.preventDefault();
  favoritesCharacters = [];
  let html = '';
  favoriteList.innerHTML = html;
  localStorage.removeItem('favoriteCharacter');
  renderAllCharacters(allCharacters);
  searchInput.value = '';
})


//# sourceMappingURL=main.js.map
