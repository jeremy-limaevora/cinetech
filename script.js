const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${maConst}&language=fr-FR`;

fetch(apiUrl)
 .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau !');
    }
    return response.json();
 })
 .then(data => {
    console.log(data); // Affiche les données de la réponse dans la console
    // Utilisez les données comme vous le souhaitez ici
    const listeSeries = document.getElementById('listeSeries');

    // Afficher les titres de chaque série
    data.results.forEach(serie => {
        const serieLi = document.createElement('li');
        serieLi.classList.add('serie');

        // Créer un élément img
        const img = document.createElement('img');
        // Utiliser une URL d'image par défaut ou une propriété de l'objet serie
        img.src = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'chemin/vers/image/par/defaut.jpg';
        img.alt = serie.original_title;

        // Créer un élément span pour le titre
        const span = document.createElement('span');
        span.textContent = serie.original_title;

        // Ajouter l'image et le titre à l'élément li
        serieLi.appendChild(img);
        serieLi.appendChild(span);

        // Ajouter l'élément li à la liste des séries
        listeSeries.appendChild(serieLi);
    });
 })
 .catch(error => {
    console.error('Il y a eu un problème avec votre requête Fetch:', error);
 });
