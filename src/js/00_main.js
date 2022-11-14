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
const xfavorite = document.querySelector('.js_x_favorite');
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
//Eventos


/* searchInput.addEventListener('input', () => {
  const userSearch = searchInput.value;
  searchMessage.innerHTML = '';
  if (userSearch === '') {
    searchMessage.innerHTML = 'No ha especificado ningún parámetro de búsqueda';
  }
  else{
    searchMessage.innerHTML = '';
  }
}) */


//código que que ejecuta al inicio de carga de la pagina



