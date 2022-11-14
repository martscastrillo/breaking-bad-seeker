
function renderfavoriteCh() {
    let html = '';
    for (const eachCharacter of favoritesCharacters) {
        html += renderOneCharacter(eachCharacter);
    }
    favoriteList.innerHTML = html;
}