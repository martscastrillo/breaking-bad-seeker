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



