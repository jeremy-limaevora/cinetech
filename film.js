// Récupère la fenêtre modale
var modal = document.getElementById("myModal");

// Fonction pour afficher la fenêtre modale avec les détails du film
function showModal(imgSrc, details) {
    var modalImg = document.getElementById("modalImg");
    modalImg.src = imgSrc; // Affiche l'image dans la fenêtre modale

    var modalDetails = document.getElementById("modalDetails");
    modalDetails.innerHTML = ""; // Efface le contenu précédent

    // Utilisez translateDetails pour traduire les détails
    const translatedDetails = translateDetails(details);

    // Crée un paragraphe pour chaque détail du film et l'ajoute à la fenêtre modale
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

    // Affiche les détails du film dans la console
    console.log("Popup affiché avec l'image source:", imgSrc);
    console.log("Détails du film :", translatedDetails);
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

// Fonction pour traduire les détails du film en français
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

// Fonction pour afficher le popup d'inscription
document.getElementById("inscriptionBtn").addEventListener("click", function() {
    document.getElementById("inscriptionPopup").style.display = "block";
});

// Fonction pour afficher le popup de connexion
document.getElementById("connexionBtn").addEventListener("click", function() {
    document.getElementById("connexionPopup").style.display = "block";
});

// Fonction pour fermer les popups
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

document.getElementById('inscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérez les valeurs des champs du formulaire
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Vérifiez si le mot de passe et la confirmation du mot de passe correspondent
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Les mots de passe ne correspondent pas.';
        return;
    }

    // Vérifiez si l'email est valide (simple vérification, améliorez selon vos besoins)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Email invalide.';
        return;
    }

    // Vérifiez si le mot de passe a une longueur minimale (par exemple, 8 caractères)
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Le mot de passe doit avoir au moins 8 caractères.';
        return;
    }

    // Créez un objet utilisateur avec les informations d'inscription
    const user = {
        nom: nom,
        email: email,
        password: password // Note: Stocker des mots de passe en clair n'est pas sécurisé.
    };

    // Stocker l'utilisateur dans le localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Fermez le popup après la soumission
    closePopup('inscriptionPopup');

    // Affichez un message de succès ou redirigez l'utilisateur
    alert('Inscription réussie !');
});

// Fonction pour afficher le popup d'inscription
document.getElementById("inscriptionBtn").addEventListener("click", function() {
    document.getElementById("inscriptionPopup").style.display = "block";
});

// Récupère le bouton de fermeture du popup d'inscription
var closeInscriptionPopupButton = document.querySelector("#inscriptionPopup .close");

// Ajoute un gestionnaire d'événements pour fermer le popup d'inscription lorsque l'utilisateur clique sur le bouton de fermeture
closeInscriptionPopupButton.addEventListener("click", function() {
    document.getElementById("inscriptionPopup").style.display = "none";
});

// Ferme le popup d'inscription lorsque l'utilisateur clique en dehors de celui-ci
window.onclick = function(event) {
    if (event.target == document.getElementById("inscriptionPopup")) {
        document.getElementById("inscriptionPopup").style.display = "none";
    }
};
