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