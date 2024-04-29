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
    const listeSeries = document.getElementById('listeSeries');

    // Fonction pour ajouter une série aux favoris
    function ajouterAuxFavoris(serie) {
        // Récupérer les séries favorites existantes du stockage local
        let favoris = localStorage.getItem('favoris');
        favoris = favoris ? JSON.parse(favoris) : [];

        // Vérifier si la série n'est pas déjà dans les favoris
        const serieExistante = favoris.find(favSerie => favSerie.id === serie.id);
        if (!serieExistante) {
            // Ajouter les données de la série à la liste des favoris
            favoris.push({
                id: serie.id,
                title: serie.original_name,
                image: serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''
            });

            // Mettre à jour les séries favorites dans le stockage local
            localStorage.setItem('favoris', JSON.stringify(favoris));
            alert('Série ajoutée aux favoris !');
        } else {
            alert('Cette série est déjà dans les favoris.');
        }
    }

    // Afficher les titres et les images de chaque série
    data.results.forEach(serie => {
        const serieLi = document.createElement('li');
        serieLi.classList.add('serie');

        // Créer un élément img pour l'image de la série
        const img = document.createElement('img');
        img.src = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : '';
        img.alt = serie.original_name;

        // Créer un bouton "Favoris" avec une icône d'étoile
        const favorisBtn = document.createElement('button');
        const starIcon = document.createElement('img');
        starIcon.src = 'etoile.png'; // Remplacez 'etoile.png' par le chemin de votre image d'étoile
        starIcon.alt = 'Ajouter aux favoris';
        favorisBtn.appendChild(starIcon);

        favorisBtn.addEventListener('click', () => {
            // Ajouter la série aux favoris lorsqu'on clique sur le bouton "Favoris"
            ajouterAuxFavoris(serie);
        });

        // Créer un élément span pour le titre et y insérer le titre de la série
        const titleSpan = document.createElement('span');
        titleSpan.textContent = serie.original_name; // Utilise original_name pour le titre de la série

        // Ajouter l'image, le titre et le bouton "Favoris" à l'élément li
        serieLi.appendChild(img);
        serieLi.appendChild(titleSpan);
        serieLi.appendChild(favorisBtn);

        // Ajouter l'élément li à la liste des séries
        listeSeries.appendChild(serieLi);
    });
 })
 .catch(error => {
    console.error('Il y a eu un problème avec votre requête Fetch:', error);
 });
