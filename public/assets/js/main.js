"use strict";

// Variables qSelector
const characterList = document.querySelector('.js_character_list');
const favoriteList = document.querySelector('.js-favorite-list');
const searchBtn = document.querySelector('.js_btn');
const searchInput = document.querySelector('.js_search');
const searchStatus = document.querySelector('.js_status');
const form = document.querySelector('.js_form');
const resetBtn = document.querySelector('.js_reset_btn');


//Variables

let allCharacters = [];
let favoritesCharacters = [];





function handleClick(event) {
  event.currentTarget.classList.toggle('selected');
  const selectedCh = allCharacters.find((charac) => charac.char_id === parseInt(event.currentTarget.id));
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(event.currentTarget.id));
  if (characterInFavsIndex === -1) {
    favoritesCharacters.push(selectedCh);
  }
  else {
    favoritesCharacters.splice(characterInFavsIndex, 1);
  }
  localStorage.setItem('favoriteCharacter', JSON.stringify(favoritesCharacters));
  renderfavoriteCh();
}
function renderOneCharacter(character) {
  let classSelected = '';
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(character.char_id));
  if (characterInFavsIndex === -1) {
    classSelected = '';
  }
  else {
    classSelected = 'selected';
  }
  let html = `<li>
      <article class="js_article ${classSelected} card" id="${character.char_id}"> 
      <span class="card__photobox">
        <img class="card__img"
          src="${character.img}"
          alt="characterImage">
          </span>
          <div class ="text">
            <h3 class="card__name">${character.name}</h3>
            <h3 class="card__status">${character.status}</h3>
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
function renderAllCharacters(characters) {
  let html = '';
  for (const eachCharacter of characters) {
    html += renderOneCharacter(eachCharacter);
  }
  characterList.innerHTML = html;
  addCharacterListeners();
}
addCharacterListeners();
fetch('./assets/data/characters.json')
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
function renderFAVCharacter(character) {
  let html = `<li>
      <article class="selectedfav card" id="${character.char_id}"> 
      <p class="xfavorite js_x_favorite" id="${character.char_id}">X</p>
      <span class="card__photobox">
        <img class="card__img"
          src="${character.img}"
          alt="characterImage">
          </span>
          <div class ="text">
            <h3 class="card__name"">${character.name}</h3>
            <h3 class="card__status">${character.status}</h3>
          </div>
      </article>
      </li>`;
  return html;
}
function handleClickCancellFav(event) {
  event.preventDefault();
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(event.currentTarget.id));
  favoritesCharacters.splice(characterInFavsIndex, 1);
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
  }
  else if (userSearch) {
    const filteredCharacters = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch));
    renderAllCharacters(filteredCharacters);
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
    renderAllCharacters(filteredStatus);
  }

})

const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));
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
