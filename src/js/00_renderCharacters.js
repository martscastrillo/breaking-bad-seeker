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
            <h3 class="card__name">${character.occupation}</h3>
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
  arrayLength = characters.length;
  console.log(arrayLength);
  searchResult.innerHTML = `Hay ${arrayLength} resultados de su búsqueda`;
  addCharacterListeners();
}
addCharacterListeners();