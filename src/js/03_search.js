form.addEventListener('submit', (event) => {
  event.preventDefault();
})
searchBtn.addEventListener('click', () => {
  const userSearch = searchInput.value.toLowerCase();
  const searchStatusValue = searchStatus.value;
  if (userSearch && (searchStatusValue !== 'All')) {
    const superfilter = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch)).filter((eachCharacter) => eachCharacter.status.includes(searchStatusValue));
    renderAllCharacters(superfilter);
    console.log(superfilter);
  }
  else if (userSearch) {
    //variable para meter los personajes que coincidan con la busqueda
    const filteredCharacters = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch));
    //pinta los personajes filtrados
    renderAllCharacters(filteredCharacters);
    searchMessage.innerHTML = '';
  }
  else if (searchStatusValue) {
    const filteredStatus = allCharacters.filter((eachCharacter) => {
      if (searchStatusValue === 'All') { //para forzale a darno contenido al render, de modo que siempre muestre todos
        return true;
      }
      else {
        return eachCharacter.status.includes(searchStatusValue);
      }
    });
    console.log(filteredStatus);
    renderAllCharacters(filteredStatus);
    searchMessage.innerHTML = '';
  }

})
