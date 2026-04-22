/**
 * Theme Toggle — Bascule Light/Dark Mode avec persistance localStorage.
 * 
 * Ce script :
 * 1. Restaure le thème sauvegardé depuis localStorage au chargement.
 * 2. Injecte automatiquement le bouton toggle soleil/lune dans le DOM.
 * 3. Sauvegarde le choix de l'utilisateur pour toutes les pages du portfolio.
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'portfolio-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // ───────────────────────────────────────────────
    // 1. Appliquer le thème AVANT le rendu (anti-flash)
    // ───────────────────────────────────────────────
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === DARK) {
        document.documentElement.setAttribute('data-theme', DARK);
    } else {
        // Mode clair par défaut — on s'assure que l'attribut n'existe pas
        document.documentElement.removeAttribute('data-theme');
    }

    // ───────────────────────────────────────────────
    // 2. Créer et injecter le bouton toggle
    // ───────────────────────────────────────────────
    function createToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.setAttribute('id', 'theme-toggle');
        btn.setAttribute('aria-label', 'Basculer le thème clair/sombre');
        btn.setAttribute('title', 'Changer de thème');
        btn.innerHTML = `
            <i class="fas fa-sun icon-sun"></i>
            <i class="fas fa-moon icon-moon"></i>
        `;

        btn.addEventListener('click', toggleTheme);
        document.body.appendChild(btn);
    }

    // ───────────────────────────────────────────────
    // 3. Logique de bascule
    // ───────────────────────────────────────────────
    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === DARK;

        if (isDark) {
            // Passer en mode clair
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem(STORAGE_KEY, LIGHT);
        } else {
            // Passer en mode sombre
            document.documentElement.setAttribute('data-theme', DARK);
            localStorage.setItem(STORAGE_KEY, DARK);
        }
    }

    // ───────────────────────────────────────────────
    // 4. Initialiser quand le DOM est prêt
    // ───────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createToggleButton);
    } else {
        createToggleButton();
    }
})();
