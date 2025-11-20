
  const links = document.querySelectorAll("ul li a");

  // Ajouter un événement pour chaque lien
  links.forEach(link => {
    link.addEventListener("click", () => {
      // Supprimer la classe "active" de tous les liens
      links.forEach(l => l.classList.remove("active"));
      // Ajouter la classe "active" au lien cliqué
      link.classList.add("active");
    });
  });