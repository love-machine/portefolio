function updateClock() {
    const now = new Date();

    // Récupérer l'heure
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Récupérer la date complète (jour, mois, année)
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const monthsOfYear = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    let dayOfWeek = daysOfWeek[now.getDay()];  // Jour de la semaine
    let day = now.getDate().toString().padStart(2, '0');  // Jour du mois
    let month = monthsOfYear[now.getMonth()];  // Mois
    let year = now.getFullYear();  // Année

    // Formater la date
    const time = `${hours}:${minutes}:${seconds}`;
    const date = `${dayOfWeek}, ${day} ${month} ${year}`;

    // Afficher la date et l'heure dans l'élément #clock
    document.getElementById('clock').innerText = `${date} - ${time}`;
}

// Mettre à jour l'horloge toutes les secondes
setInterval(updateClock, 1000);

// Appeler la fonction une première fois pour afficher l'heure immédiatement
updateClock();
