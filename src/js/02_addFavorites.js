
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