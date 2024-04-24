const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau !');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Affiche les données de la réponse dans la console
    const listeFilms = document.getElementById('listeFilms');

    // Afficher les titres de chaque film
    data.results.forEach(film => {
      const filmLi = document.createElement('li');
      filmLi.classList.add('film');

      // Créer un élément img
      const img = document.createElement('img');
      // Utiliser une URL d'image par défaut ou une propriété de l'objet film
      img.src = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : 'chemin/vers/image/par/defaut.jpg';
      img.alt = film.original_title;

      // Créer un élément span pour le titre
      const span = document.createElement('span');
      span.textContent = film.original_title;

      // Ajouter l'image et le titre à l'élément li
      filmLi.appendChild(img);
      filmLi.appendChild(span);

      listeFilms.appendChild(filmLi);
    });
  })
  .catch(error => {
    console.error('Il y a eu un problème avec votre requête Fetch:', error);
  });
