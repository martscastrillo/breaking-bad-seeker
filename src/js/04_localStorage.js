const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));

//despues de un get item hacemos un if para comprobar si hay o no algo en local storage
if (savedFavorites !== null) {
  favoritesCharacters = savedFavorites;
  renderfavoriteCh();
}
