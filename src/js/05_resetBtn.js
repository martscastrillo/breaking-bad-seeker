resetBtn.addEventListener("click", (event) => {
	event.preventDefault();
  favoritesCharacters = [];
  let html = '';
  favoriteList.innerHTML = html;
  localStorage.removeItem('favoriteCharacter');
  renderAllCharacters(allCharacters);
  searchInput.value = '';
})
