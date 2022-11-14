
function renderfavoriteCh() {
  
    let html = '';
    for (const eachCharacter of favoritesCharacters) {
        html += renderOneCharacter(eachCharacter);
    }
    favoriteList.innerHTML = html;
  /*   const xfavorite = document.querySelectorAll('.js_x_favorite');
    for (const onex of xfavorite) {
      onex.addEventListener('click', handleClickx);
    } */
}