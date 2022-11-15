const savedFavorites = JSON.parse(localStorage.getItem('favoriteCharacter'));
if (savedFavorites !== null) {
  favoritesCharacters = savedFavorites;
  renderfavoriteCh();
}
