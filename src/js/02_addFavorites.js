
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