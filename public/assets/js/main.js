"use strict";

// Variables qSelector
const characterList = document.querySelector('.js_character_list');
const favoriteList = document.querySelector('.js-favorite-list');
const searchInput = document.querySelector('.js_search');
const form = document.querySelector('.js_form');
//Variables

let allCharacters =[];
let favoritesCharacters =[];

//Funciones
//   atributo gancho para poder trabajar luego con el currentTarget 
function renderCharacter (character) {
    let html = `<li>
    <article class="js_article card" id="${character.char_id}">
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
function addCharacterListeners (){
  const allCards = document.querySelectorAll('.js_article');
    for (const eachCard of allCards) {
        eachCard.addEventListener('click', handleClick);
    }
} 
function handleClick(event){
    //evento para concretamente que el currentTarget sobre donde está el evento, 
    //en nuestro caso en cada tarjeta
    event.currentTarget.classList.toggle('selected');
    //busca en el array aquel objeto que tiene el mismo char_id  que el char_id  del current Target
    console.log(event.currentTarget.id);

    //rellena el array de favoritos con lo qhe ha encontrado
    const selectedCh = allCharacters.find((charac) => charac.id === event.currentTarget.id);

    console.log(selectedCh);
    favoritesCharacters.push(selectedCh);  
    console.log(selectedCh);
 ////////////////////////////////////
}
function renderfavoriteCh (){
  let html = '';
  for (const eachCharacter of allCharacters) {
    html +=  renderfavoriteCh (eachCharacter);
  }
  favoriteList.innerHTML = html;
  //por ser un qSAll nos dá un array

}

function renderAllCharacters (){
    let html = '';
    for (const eachCharacter of allCharacters) {
      html +=  renderCharacter (eachCharacter);
    }
    characterList.innerHTML = html;
    //por ser un qSAll nos dá un array
    const characterCard = document.querySelectorAll('.js_article');
    //para recorrer el array que genera el qSAll asigna con el bucle el evento
    for (const eachCard of characterCard) {
        eachCard.addEventListener('click', handleClick);
    }
    addCharacterListeners ();
}

addCharacterListeners ();
//Eventos
form.addEventListener('submit', (event) => {
  event.preventDefault();
})
searchInput.addEventListener('input', () => {
  const userSearch = searchInput.value.toLowerCase();

  console.log(userSearch);
  //variable para meter los personajes que coincidan con la busqueda
  const filteredCharacters = allCharacters.filter((userSearch) => userSearch.name.toLowerCase().includes(userSearch));
  ///////
  //pinta los personajes filtrados
  renderAllShips(filteredCharacters);
});
//código que que ejecuta al inicio de carga de la pagina



fetch ('https://breakingbadapi.com/api/characters')
.then ((response) => response.json())
.then((data) => {
    allCharacters = data;
    renderAllCharacters ();
   
  });
//# sourceMappingURL=main.js.map
