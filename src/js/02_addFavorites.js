
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
    //////
    console.log(parseInt(event.currentTarget.id));
    const currentTargetId =allCharactersCard[parseInt(event.currentTarget.id)];
    console.log(currentTargetId);
  
    //busqueda para saber la posicion en favoritos si la tarjeta está en favoritos

    /*  if (event.currentTarget.id !== favsInAll) {
         event.currentTarget.classList.remove('selected');
     
 
 
     }
  */
}