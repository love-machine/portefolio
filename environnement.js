// Script pour la page Environnement de Travail
document.addEventListener('DOMContentLoaded', function() {
    
    // Données des outils
    const toolsData = {
        teams: {
            name: "Microsoft Teams",
            icon: "fab fa-microsoft",
            iconClass: "teams-icon",
            description: "Plateforme de communication et collaboration",
            usage: "Communication quotidienne avec l'équipe, partage d'écran pour les présentations, réunions virtuelles et gestion de projets collaboratifs.",
            features: [
                "Messagerie instantanée professionnelle",
                "Visioconférences HD avec partage d'écran",
                "Intégration Office 365",
                "Canaux dédiés par projet",
                "partage de fichiers"
            ],
            skills: [
                "Organisation de réunions efficaces",
                "Collaboration à distance",
                "Gestion des canaux d'équipe",
                "Intégration d'applications tiers"
            ]
        },
        onenote: {
            name: "Microsoft OneNote",
            icon: "fa fa-book",
            iconClass: "onenote-icon",
            description: "Système de prise de notes numérique organisé",
            usage: "organiser ma prise de notes.",
            features: [
                "Organisation hiérarchique (Blocs-notes/Sections/Pages)",
                "Synchronisation multi-appareils",
                "Recherche avancée dans les notes",
                "Insertion multimedia (images, audio, vidéos)",
                "Collaboration en temps réel"
            ],
            skills: [
                "Structuration efficace de l'information",
                "Documentation technique",
                "Prise de notes en cours",
                "Archivage organisé des projets"
            ]
        },
        visualstudio: {
            name: "Visual Studio",
            icon: "fa fa-code",
            iconClass: "vs-icon",
            description: "Environnement de développement intégré (IDE)",
            usage: "Développement web, création d'exécutables, programmation Python pour les cours d'algorithmique et participation aux CTF (Capture The Flag).",
            features: [
                "Débogueur puissant",
                "Intégration Git native",
                "Extensions et plugins",
                "Support multi-langages"
            ],
            skills: [
                "Développement web ,c",
                "Débogage et tests unitaires",
                "Gestion de versions (Git)",
                "Développement d'API REST"
            ]
        },
        wireshark: {
            name: "Wireshark",
            icon: "fa fa-network-wired",
            iconClass: "wireshark-icon",
            description: "Analyseur de protocoles réseau",
            usage: "Analyse du trafic réseau, diagnostic de problèmes de connectivité, étude des protocoles de communication et sécurité réseau.",
            features: [
                "Capture de paquets en temps réel",
                "Analyse de 2000+ protocoles",
                "Filtres avancés",
                "Interface graphique intuitive",
                "Export vers différents formats"
            ],
            skills: [
                "Analyse de protocoles TCP/IP",
                "Diagnostic réseau",
                "Détection d'anomalies",
                "Optimisation des performances réseau"
            ]
        }
    };

    // Éléments DOM
    const toolCards = document.querySelectorAll('.tool-card');
    const detailsContainer = document.getElementById('toolDetails');

    // Gestion des clics sur les cartes
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolId = this.dataset.tool;
            const toolData = toolsData[toolId];
            
            // Retirer la classe active de toutes les cartes
            toolCards.forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active à la carte cliquée
            this.classList.add('active');
            
            // Afficher les détails avec animation
            showToolDetails(toolData);
        });

        // Effet de survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });

    // Fonction pour afficher les détails d'un outil
    function showToolDetails(toolData) {
        const detailsHTML = `
            <div class="tool-details">
                <div class="tool-header">
                    <div class="tool-icon ${toolData.iconClass}">
                        <i class="${toolData.icon}"></i>
                    </div>
                    <h3>${toolData.name}</h3>
                </div>
                
                <div class="tool-info">
                    <div class="info-block">
                        <h4><i class="fa fa-info-circle"></i> Description</h4>
                        <p>${toolData.description}</p>
                        
                        <h4><i class="fa fa-user-cog"></i> Mon utilisation</h4>
                        <p>${toolData.usage}</p>
                    </div>
                    
                    <div class="info-block">
                        <h4><i class="fa fa-star"></i> Fonctionnalités clés</h4>
                        <ul>
                            ${toolData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Animation de sortie
        detailsContainer.style.opacity = '0';
        detailsContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            detailsContainer.innerHTML = detailsHTML;
            
            // Animation d'entrée
            setTimeout(() => {
                detailsContainer.style.opacity = '1';
                detailsContainer.style.transform = 'translateY(0)';
            }, 50);
        }, 200);
    }

    // Animation de chargement des cartes
    function animateCards() {
        toolCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Animation des étapes du workflow
    function animateWorkflowSteps() {
        const workflowSteps = document.querySelectorAll('.workflow-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });

        workflowSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-50px)';
            step.style.transition = 'all 0.6s ease';
            observer.observe(step);
        });
    }

    // Fonction pour créer un effet de particules sur les cartes
    function createParticleEffect(card) {
        const rect = card.getBoundingClientRect();
        const particle = document.createElement('div');
        
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#00A9E0';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(particle);
        
        // Animation de la particule
        particle.animate([
            { transform: 'scale(0) translateY(0px)', opacity: 1 },
            { transform: 'scale(1) translateY(-50px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // Ajouter l'effet de particules aux cartes
    toolCards.forEach(card => {
        card.addEventListener('click', () => createParticleEffect(card));
    });

    // Initialisation
    animateCards();
    animateWorkflowSteps();
    
    // Message de bienvenue avec animation
    setTimeout(() => {
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.style.animation = 'pulse 2s ease-in-out';
        }
    }, 1000);

    console.log('🚀 Environnement de travail initialisé avec succès !');
});