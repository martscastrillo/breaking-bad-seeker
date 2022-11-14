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
/* function handleClickx (event){
  event.preventDefault();
  console.log('entra');
  const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(event.currentTarget.id));
  console.log(characterInFavsIndex);
  console.log(event.currentTarget.id);
  favoritesCharacters.splice(characterInFavsIndex, 1);
  console.log(favoritesCharacters);
  localStorage.setItem('favoriteCharacter', JSON.stringify(favoritesCharacters));
  renderAllCharacters(allCharacters);
  renderfavoriteCh();
  
} */

function renderOneCharacter(character) {
    let classSelected = '';
   /*  let xFavorite = ''; */
    //busqueda para saber la posicion en favoritos si la tarjeta está en favoritos
    const characterInFavsIndex = favoritesCharacters.findIndex((charac) => charac.char_id === parseInt(character.char_id));
    const characterInFavs = favoritesCharacters.find((charac) => charac.char_id === parseInt(character.char_id));
   
    //si la busqueda es -1 es decir que no lo encuentra, entonces lo añade 
    if (characterInFavsIndex === -1) {
        classSelected = '';
      /*   xFavorite = ''; */
    }
    // si la busqueda da un index es que si lo encuentra y entonces, debe quitarlo
    else {
        classSelected = 'selected';
      /*   xFavorite =  `<p class="xfavorite js_x_favorite" id="${character.char_id}">X</p>`; */
    }
    // atributo gancho char_id para poder trabajar luego con el currentTarget 
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