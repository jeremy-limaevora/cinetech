// Constante pour la clé de l'API TMDb
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
            serieLi.classList.add('Series');

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

            // Ajouter un gestionnaire d'événements de clic pour afficher la fenêtre modale lorsque la série est cliquée
            serieLi.addEventListener('click', () => {
                showModal(serie);
            });

            // Ajouter l'élément li à la liste des séries
            listeSeries.appendChild(serieLi);
        });
    })
    .catch(error => {
        console.error('Il y a eu un problème avec votre requête Fetch:', error);
    });

// Récupère la fenêtre modale
var modal = document.getElementById("myModal");

// Fonction pour afficher la fenêtre modale avec les détails de la série
function showModal(serie) {
    var modalImg = document.getElementById("modalImg");
    modalImg.src = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''; // Affiche l'image dans la fenêtre modale

    var modalDetails = document.getElementById("modalDetails");
    modalDetails.innerHTML = ""; // Efface le contenu précédent

    // Utilisez translateDetails pour traduire les détails
    const translatedDetails = translateDetails({
        original_language: serie.original_language,
        original_title: serie.original_name,
        overview: serie.overview,
        release_date: serie.release_date,
        title: serie.name // Utilise name pour le titre de la série
    });

    // Crée un paragraphe pour chaque détail de la série et l'ajoute à la fenêtre modale
    for (const key in translatedDetails) {
        if (translatedDetails.hasOwnProperty(key)) {
            const value = translatedDetails[key];
            modalDetails.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }

    // Affiche la fenêtre modale avec un effet de fondu
    modal.style.opacity = 0;
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.opacity = 1;
    }, 50); // Délai pour permettre à la transition de se produire

    // Affiche les détails de la série dans la console
    console.log("Popup affiché avec l'image source:", serie.poster_path);
    console.log("Détails de la série :", translatedDetails);
}

// Récupère le bouton de fermeture de la fenêtre modale
var closeButton = document.querySelector("#myModal .close");

// Ajoute un gestionnaire d'événements pour fermer la fenêtre modale lorsque l'utilisateur clique sur le bouton de fermeture
closeButton.addEventListener("click", function() {
    modal.style.display = "none";
});

// Ferme la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Fonction pour traduire les détails de la série en français
function translateDetails(details) {
    const translations = {
        original_language: "Langue d'origine",
        original_title: "Titre original",
        overview: "Résumé",
        release_date: "Date de sortie",
        title: "Titre"
    };

    let translatedDetails = {};
    for (const key in details) {
        if (details.hasOwnProperty(key) && translations[key]) {
            translatedDetails[translations[key]] = details[key];
        } else {
            translatedDetails[key] = details[key];
        }
    }
    return translatedDetails;
}

