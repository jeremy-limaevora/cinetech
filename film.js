
// Récupère la fenêtre modale et le bouton de fermeture
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Fonction pour afficher la fenêtre modale avec les détails du film
function showModal(imgSrc, details) {
    var modalImg = document.getElementById("modalImg");
    modalImg.src = imgSrc; // Affiche l'image dans la fenêtre modale

    var modalDetails = document.getElementById("modalDetails");
    modalDetails.innerHTML = ""; // Efface le contenu précédent

    // Crée un paragraphe pour chaque détail du film et l'ajoute à la fenêtre modale
    for (const key in details) {
        if (details.hasOwnProperty(key)) {
            const value = details[key];
            modalDetails.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }

    // Affiche la fenêtre modale
    modal.style.display = "block";

    // Affiche les détails du film dans la console
    console.log("Popup affiché avec l'image source:", imgSrc);
    console.log("Détails du film :", details);
}

// Ferme la fenêtre modale lorsque l'utilisateur clique sur le bouton de fermeture
span.onclick = function() {
    modal.style.display = "none";
}

// Ferme la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Constante pour la clé de l'API TMDb
const maConst = '8c4b867188ee47a1d4e40854b27391ec';
// URL de l'API pour obtenir la liste des films
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`;

// Fonction pour récupérer les données de l'API et afficher les films
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

            // Créer un élément img pour l'affiche
            const img = document.createElement('img');
            // Utiliser une URL d'image par défaut ou une propriété de l'objet film
            const imgSrc = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : 'chemin/vers/image/par/defaut.jpg';
            img.src = imgSrc;
            img.alt = film.original_title;

            // Afficher l'URL de l'image dans la console
            console.log("URL de l'image:", imgSrc);

            // Ajoute un gestionnaire d'événements de clic pour afficher la fenêtre modale lorsque l'image est cliquée
            img.addEventListener('click', function() {
                showModal(img.src, {
                    original_language: film.original_language,
                    original_title: film.original_title,
                    overview: film.overview,
                    release_date: film.release_date,
                    title: film.title
                });
            });

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
