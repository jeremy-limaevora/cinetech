const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`;
const apiUrlSeries = `https://api.themoviedb.org/3/discover/tv?api_key=${maConst}&language=fr-FR`;
document.addEventListener("DOMContentLoaded", function() {
  // Fonction pour ouvrir ou fermer un pop-up
  function togglePopup(popupId) {
      var popup = document.getElementById(popupId);
      if (popup.style.display === "none") {
          popup.style.display = "block";
      } else {
          popup.style.display = "none";
      }
  }

  // Ajouter des écouteurs d'événements pour les boutons de connexion et d'inscription
  document.querySelectorAll('[data-popup]').forEach(function(button) {
      button.addEventListener('click', function() {
          togglePopup(this.dataset.popup);
      });
  });

  // Ajouter des écouteurs d'événements pour les boutons de fermeture
  document.querySelectorAll('[data-close]').forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
          togglePopup(this.dataset.close);
      });
  });

  // Ajouter un écouteur d'événements pour fermer les pop-ups en cliquant en dehors
  window.addEventListener('click', function(event) {
      var popups = document.querySelectorAll('.popup');
      popups.forEach(function(popup) {
          if (event.target == popup) {
              togglePopup(popup.id);
          }
      });
  });
});


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
  
  
  fetch(apiUrlSeries)
  .then(response => {
     if (!response.ok) {
       throw new Error('Erreur de réseau !');
     }
     return response.json();
  })
  .then(data => {
     console.log(data); // Affiche les données de la réponse dans la console
     const listeSeries = document.getElementById('listeSeries');
 
     // Afficher les titres de chaque série
     data.results.forEach(serie => {
       const serieLi = document.createElement('li');
       serieLi.classList.add('Series');
 
       // Créer un élément img
       const img = document.createElement('img');
       // Utiliser une URL d'image par défaut ou une propriété de l'objet serie
       img.src = serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'chemin/vers/image/par/defaut.jpg';
       img.alt = serie.original_name;
 
       // Créer un élément span pour le titre
       const span = document.createElement('span');
       span.textContent = serie.original_name;
 
       // Ajouter l'image et le titre à l'élément li
       serieLi.appendChild(img);
       serieLi.appendChild(span);
 
       listeSeries.appendChild(serieLi);
     });
  })
  .catch(error => {
     console.error('Il y a eu un problème avec votre requête Fetch:', error);
  });




  document.getElementById('inscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérez les valeurs des champs du formulaire
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Vérifiez si le mot de passe et la confirmation du mot de passe correspondent
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
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
    togglePopup('inscriptionPopup');
});
document.getElementById('connexionForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupérez les valeurs des champs du formulaire
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Récupérez l'utilisateur stocké dans le localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Vérifiez si l'utilisateur existe et si les informations de connexion sont correctes
  if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Connexion réussie !');
  } else {
      alert('Email ou mot de passe incorrect.');
  }

  // Fermez le popup après la soumission
  togglePopup('connexionPopup');
});

