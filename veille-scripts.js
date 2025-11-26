// ===== SYSTÈME COMPLET TECHNOLOGIES ÉMERGENTES =====

// Configuration des sources d'API et RSS pour les technologies émergentes
const TECH_SOURCES = {
    techcrunch: 'https://techcrunch.com/feed/',
    arsTechnica: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    wired: 'https://www.wired.com/feed/rss',  
    verge: 'https://www.theverge.com/rss/index.xml'
};

// Base de données des technologies émergentes avec images - THÈME BUGATTI
const EMERGING_TECH_DATABASE = [
    {
        name: "Intelligence Artificielle Générative",
        description: "Les IA comme GPT-4, Claude et Gemini transforment la création de contenu, la programmation et l'automatisation des tâches complexes.",
        trend: "Adoption massive",
        impact: "Révolution créative",
        category: "IA",
        keywords: ["ai", "gpt", "claude", "intelligence artificielle", "machine learning"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        bugatti_relevance: "Automatisation et optimisation des processus"
    },
    {
        name: "Quantum Computing",
        description: "Les ordinateurs quantiques d'IBM, Google et IonQ promettent de révolutionner la cryptographie, la simulation moléculaire et l'optimisation.",
        trend: "Recherche avancée",
        impact: "Potentiel disruptif",
        category: "Hardware",
        keywords: ["quantum", "quantique", "ibm", "google quantum"],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
        bugatti_relevance: "Puissance de calcul révolutionnaire"
    },
    {
        name: "Edge Computing & 5G",
        description: "Le traitement des données au plus près des utilisateurs avec la 5G permet une latence ultra-faible pour l'IoT et la réalité augmentée.",
        trend: "Déploiement accéléré",
        impact: "Optimisation réseau",
        category: "Infrastructure",
        keywords: ["edge computing", "5g", "latence", "iot"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        bugatti_relevance: "Performance et rapidité extrêmes"
    },
    {
        name: "Cybersécurité Zero Trust",
        description: "L'architecture Zero Trust devient la norme avec 'jamais faire confiance, toujours vérifier' face aux cybermenaces sophistiquées.",
        trend: "Adoption entreprise",
        impact: "Nouvelle norme sécurité",
        category: "Sécurité",
        keywords: ["zero trust", "cybersécurité", "siem", "soc"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        bugatti_relevance: "Sécurité de niveau premium"
    },
    {
        name: "Web3 & Blockchain Evolution",
        description: "Au-delà des cryptomonnaies, la blockchain trouve des applications en supply chain, identité numérique et contrats intelligents.",
        trend: "Maturation",
        impact: "Décentralisation",
        category: "Blockchain",
        keywords: ["web3", "blockchain", "smart contracts", "nft"],
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=250&fit=crop",
        bugatti_relevance: "Innovation et exclusivité"
    },
    {
        name: "Réalité Mixte (AR/VR)",
        description: "Apple Vision Pro, Meta Quest et HoloLens ouvrent de nouveaux usages en formation, collaboration et divertissement immersif.",
        trend: "Adoption croissante",
        impact: "Interface révolutionnaire",
        category: "Immersif",
        keywords: ["ar", "vr", "mixed reality", "apple vision", "meta quest"],
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=250&fit=crop",
        bugatti_relevance: "Expérience utilisateur ultime"
    },
    {
        name: "Informatique Neuromorphique",
        description: "Les puces inspirées du cerveau humain comme Intel Loihi promettent une efficacité énergétique révolutionnaire pour l'IA.",
        trend: "Recherche active",
        impact: "Efficacité énergétique",
        category: "Hardware",
        keywords: ["neuromorphique", "intel loihi", "brain-inspired"],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
        bugatti_relevance: "Ingénierie de pointe"
    },
    {
        name: "Sustainable Tech / Green IT",
        description: "Technologies vertes, centres de données durables et calcul à faible empreinte carbone deviennent prioritaires.",
        trend: "Impératif écologique",
        impact: "Responsabilité environnementale",
        category: "Durabilité",
        keywords: ["green it", "sustainable tech", "carbon neutral"],
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=250&fit=crop",
        bugatti_relevance: "Performance durable"
    }
];

// Cache pour éviter les requêtes répétées
let techCache = {
    data: null,
    timestamp: 0,
    ttl: 15 * 60 * 1000 // 15 minutes
};

// Configuration proxy CORS pour récupérer les flux RSS
const TECH_CORS_PROXIES = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://thingproxy.freeboard.io/fetch/'
];

// ===== FONCTIONS UTILITAIRES - THÈME BUGATTI =====

function getBugattiTrendEmoji(trend) {
    const trendMap = {
        'Adoption massive': '🚀',
        'Recherche avancée': '⚡',
        'Déploiement accéléré': '🏎️',
        'Adoption entreprise': '🏢',
        'Maturation': '🔧',
        'Adoption croissante': '📈',
        'Recherche active': '⚙️',
        'Impératif écologique': '🌿'
    };
    return trendMap[trend] || '💎';
}

function getBugattiImpactStyle(impact) {
    const styleMap = {
        'Révolution créative': {
            primary: '#00A9E0',
            secondary: '#0088B8',
            accent: '#232323'
        },
        'Potentiel disruptif': {
            primary: '#0088B8',
            secondary: '#006B94',
            accent: '#1a1a1a'
        },
        'Optimisation réseau': {
            primary: '#006B94',
            secondary: '#005577',
            accent: '#232323'
        },
        'Nouvelle norme sécurité': {
            primary: '#005577',
            secondary: '#004455',
            accent: '#1a1a1a'
        },
        'Décentralisation': {
            primary: '#004455',
            secondary: '#003344',
            accent: '#232323'
        },
        'Interface révolutionnaire': {
            primary: '#003344',
            secondary: '#002233',
            accent: '#1a1a1a'
        },
        'Efficacité énergétique': {
            primary: '#002233',
            secondary: '#001122',
            accent: '#232323'
        },
        'Responsabilité environnementale': {
            primary: '#001122',
            secondary: '#000811',
            accent: '#1a1a1a'
        }
    };
    return styleMap[impact] || {
        primary: '#00A9E0',
        secondary: '#232323',
        accent: '#1a1a1a'
    };
}

// ===== RÉCUPÉRATION D'ARTICLES RSS =====

async function fetchTechNewsFromRSS(sourceUrl, maxArticles = 3) {
    for (const proxy of TECH_CORS_PROXIES) {
        try {
            const response = await fetch(proxy + encodeURIComponent(sourceUrl), {
                method: 'GET',
                timeout: 8000
            });
            
            if (!response.ok) continue;
            
            let xmlContent;
            if (proxy.includes('allorigins')) {
                const data = await response.json();
                xmlContent = data.contents;
            } else {
                xmlContent = await response.text();
            }
            
            if (!xmlContent || !xmlContent.includes('<rss') && !xmlContent.includes('<feed')) {
                continue;
            }
            
            return await parseTechRSS(xmlContent, maxArticles);
            
        } catch (error) {
            console.log(`Proxy ${proxy} échoué:`, error.message);
            continue;
        }
    }
    
    return [];
}

async function parseTechRSS(xmlString, maxArticles) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        
        const items = xmlDoc.querySelectorAll('item, entry');
        const articles = [];
        
        for (let i = 0; i < Math.min(items.length, maxArticles); i++) {
            const item = items[i];
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || item.querySelector('link')?.getAttribute('href') || '';
            const description = item.querySelector('description, summary')?.textContent || '';
            
            if (isTechRelevant(title + ' ' + description)) {
                articles.push({
                    title: title.substring(0, 80) + (title.length > 80 ? '...' : ''),
                    link: link,
                    description: cleanDescription(description).substring(0, 120) + '...',
                    source: getSourceName(link)
                });
            }
        }
        
        return articles;
    } catch (error) {
        console.error('Erreur parsing RSS tech:', error);
        return [];
    }
}

function isTechRelevant(text) {
    const relevantKeywords = [
        'ai', 'artificial intelligence', 'machine learning', 'quantum', 
        'blockchain', 'cryptocurrency', 'cybersecurity', 'cloud', 'edge computing',
        '5g', 'iot', 'ar', 'vr', 'mixed reality', 'neuromorphic', 'green tech'
    ];
    
    const textLower = text.toLowerCase();
    return relevantKeywords.some(keyword => textLower.includes(keyword));
}

function getSourceName(url) {
    if (url.includes('techcrunch')) return 'TechCrunch';
    if (url.includes('arstechnica')) return 'Ars Technica';
    if (url.includes('wired')) return 'Wired';
    if (url.includes('theverge')) return 'The Verge';
    return 'Tech News';
}

function cleanDescription(description) {
    if (!description) return 'Description non disponible';
    
    return description
        .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        .replace(/<[^>]*>/g, '')
        .replace(/&#8211;/g, '–')
        .replace(/&#038;/g, '&')
        .replace(/&#8217;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

// ===== FONCTION PRINCIPALE =====

async function fetchEmergingTechnologies() {
    console.log('🏎️ Actualisation des technologies émergentes - Thème Bugatti...');
    
    const loadingElement = document.getElementById('tech-loading');
    const containerElement = document.getElementById('technologies-container');
    const errorElement = document.getElementById('error-message');
    const lastUpdateElement = document.getElementById('last-update');
    
    if (loadingElement) {
        loadingElement.style.display = 'block';
        loadingElement.innerHTML = `
            <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #232323, #00A9E0); border-radius: 15px; color: white;">
                <h3 style="margin: 0 0 15px 0; font-size: 24px;">⚡ Récupération des données tech</h3>
                <p style="margin: 10px 0; opacity: 0.9;">Analyse des flux RSS TechCrunch, Ars Technica, Wired...</p>
                <div style="margin: 20px 0;">
                    <div style="width: 100%; background: rgba(255,255,255,0.2); border-radius: 10px; height: 8px; overflow: hidden;">
                        <div style="width: 0%; background: linear-gradient(90deg, #00A9E0, #ffffff); height: 100%; border-radius: 10px; animation: bugatti-loading 3s ease-in-out infinite;" id="progress-bar"></div>
                    </div>
                </div>
                <small style="opacity: 0.8;">Performance et innovation Bugatti</small>
            </div>
        `;
    }
    
    if (errorElement) errorElement.style.display = 'none';
    
    try {
        const now = Date.now();
        if (techCache.data && (now - techCache.timestamp) < techCache.ttl) {
            console.log('💎 Cache technologies Bugatti disponible');
            displayBugattiTechnologies(techCache.data);
            return;
        }
        
        console.log('🌐 Récupération des flux RSS avec style Bugatti...');
        const newsPromises = Object.entries(TECH_SOURCES).map(([source, url]) => 
            fetchTechNewsFromRSS(url, 2).catch(err => {
                console.log(`Source ${source} échoué:`, err.message);
                return [];
            })
        );
        
        const newsResults = await Promise.all(newsPromises);
        const allNews = newsResults.flat().slice(0, 6);
        
        const enhancedTechData = EMERGING_TECH_DATABASE.map(tech => {
            const relevantNews = allNews.filter(article => 
                tech.keywords.some(keyword => 
                    article.title.toLowerCase().includes(keyword) || 
                    article.description.toLowerCase().includes(keyword)
                )
            );
            
            return {
                ...tech,
                recentNews: relevantNews.slice(0, 2),
                hasNews: relevantNews.length > 0
            };
        });
        
        techCache = {
            data: enhancedTechData,
            timestamp: now,
            ttl: techCache.ttl
        };
        
        console.log(`✨ ${allNews.length} actualités intégrées avec style Bugatti`);
        displayBugattiTechnologies(enhancedTechData);
        
    } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);
        
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.innerHTML = `
                <div style="background: linear-gradient(135deg, #232323, #00A9E0); color: white; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #00A9E0;">
                    <i class="fas fa-exclamation-triangle" style="color: #ffffff; margin-right: 10px;"></i>
                    <strong>Système Bugatti :</strong> ${error.message}
                    <br><small style="opacity: 0.8;">Données de base affichées avec style premium.</small>
                </div>
            `;
        }
        
        displayBugattiTechnologies(EMERGING_TECH_DATABASE);
        
    } finally {
        if (loadingElement) loadingElement.style.display = 'none';
        
        if (lastUpdateElement) {
            lastUpdateElement.textContent = new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
}

// ===== AFFICHAGE DES TECHNOLOGIES - STYLE BUGATTI =====

function displayBugattiTechnologies(technologies) {
    const containerElement = document.getElementById('technologies-container');
    if (!containerElement) return;
    
    containerElement.innerHTML = technologies.map((tech, index) => {
        const trendEmoji = getBugattiTrendEmoji(tech.trend);
        const impactStyle = getBugattiImpactStyle(tech.impact);
        
        const isEven = index % 2 === 0;
        const cardStyle = isEven 
            ? `linear-gradient(135deg, ${impactStyle.primary}, ${impactStyle.secondary})`
            : `linear-gradient(135deg, ${impactStyle.secondary}, ${impactStyle.accent})`;
        
        const newsSection = tech.recentNews && tech.recentNews.length > 0 ? `
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid rgba(255,255,255,0.3);">
                <h4 style="font-size: 14px; margin-bottom: 12px; color: #ffffff; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-newspaper" style="color: #ffffff;"></i>
                    Actualités récentes :
                </h4>
                ${tech.recentNews.map(article => `
                    <div style="margin-bottom: 10px; background: rgba(255,255,255,0.1); padding: 8px; border-radius: 6px;">
                        <a href="${article.link}" target="_blank" rel="noopener" 
                           style="color: #ffffff; text-decoration: none; font-size: 12px; line-height: 1.4; display: block; font-weight: 500;">
                            ${article.title}
                        </a>
                        <div style="font-size: 10px; color: rgba(255,255,255,0.7); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                            <i class="fas fa-external-link-alt" style="font-size: 8px;"></i>
                            ${article.source}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : '';
        
        return `
            <div class="tech-card-bugatti" style="
                background: ${cardStyle};
                border-radius: 15px;
                padding: 25px;
                color: white;
                position: relative;
                overflow: hidden;
                border: 2px solid ${impactStyle.primary};
                box-shadow: 0 8px 25px rgba(0, 169, 224, 0.3);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            " onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 15px 40px rgba(0, 169, 224, 0.5)'"
               onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 25px rgba(0, 169, 224, 0.3)'">
                
                <div style="position: absolute; top: 0; right: 0; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 0 15px 0 60px;"></div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px; position: relative; z-index: 2;">
                    <img src="${tech.image}" alt="${tech.name}" 
                         style="width: 70px; height: 70px; border-radius: 12px; object-fit: cover; margin-right: 18px; border: 2px solid rgba(255,255,255,0.3); box-shadow: 0 4px 12px rgba(0,0,0,0.3);"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9IiMwMEE5RTAiLz48dGV4dCB4PSIzNSIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPu+4jzwvdGV4dD48L3N2Zz4='">
                    <div style="flex: 1;">
                        <h3 style="margin: 0; font-size: 20px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${tech.name}</h3>
                        <div style="font-size: 12px; color: rgba(255,255,255,0.8); margin-top: 5px; display: flex; align-items: center; gap: 8px;">
                            <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 10px;">
                                ${tech.category}
                            </span>
                            <span style="font-style: italic;">
                                ${tech.bugatti_relevance}
                            </span>
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 14px; line-height: 1.5; margin: 20px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                    ${tech.description}
                </p>
                
                <div style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
                    <span style="
                        background: rgba(255,255,255,0.25); 
                        padding: 8px 16px; 
                        border-radius: 20px; 
                        font-size: 13px; 
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        border: 1px solid rgba(255,255,255,0.3);
                    ">
                        ${trendEmoji} ${tech.trend}
                    </span>
                    <span style="
                        background: rgba(255,255,255,0.25); 
                        padding: 8px 16px; 
                        border-radius: 20px; 
                        font-size: 13px; 
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        border: 1px solid rgba(255,255,255,0.3);
                    ">
                        💎 ${tech.impact}
                    </span>
                    ${tech.hasNews ? `
                        <span style="
                            background: linear-gradient(135deg, #ffffff, #00A9E0); 
                            color: #232323; 
                            padding: 6px 12px; 
                            border-radius: 15px; 
                            font-size: 11px; 
                            font-weight: bold;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            box-shadow: 0 2px 6px rgba(255,255,255,0.3);
                        ">
                            📡 LIVE NEWS
                        </span>
                    ` : ''}
                </div>
                
                ${newsSection}
            </div>
        `;
    }).join('');
    
    if (!document.getElementById('bugatti-tech-styles')) {
        const style = document.createElement('style');
        style.id = 'bugatti-tech-styles';
        style.textContent = `
            @keyframes bugatti-loading {
                0% { width: 0%; }
                50% { width: 70%; background: linear-gradient(90deg, #00A9E0, #ffffff); }
                100% { width: 100%; background: linear-gradient(90deg, #ffffff, #00A9E0); }
            }
            
            .tech-card-bugatti {
                position: relative;
            }
            
            .tech-card-bugatti::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent);
                border-radius: 15px;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            .tech-card-bugatti:hover::before {
                opacity: 1;
            }
            
            #technologies-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 25px;
                margin: 30px 0;
            }
            
            @media (max-width: 768px) {
                #technologies-container {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log(`🏎️ ${technologies.length} technologies affichées avec style Bugatti premium`);
}

// Nettoyage automatique du cache
setInterval(() => {
    if (techCache.timestamp && (Date.now() - techCache.timestamp) > techCache.ttl) {
        techCache.data = null;
        console.log('🧹 Cache Bugatti nettoyé');
    }
}, 5 * 60 * 1000);

// ===== SYSTÈME IT-CONNECT RSS =====

const imageCache = {
    used: new Set(),
    resetThreshold: 10
};

const ENHANCED_IMAGE_DATABASE = {
    'cybersécurité': [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop'
    ],
    'windows': [
        'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop'
    ],
    'linux': [
        'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=250&fit=crop'
    ],
    'réseau': [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop'
    ],
    'cloud': [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop'
    ]
};

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop'
];

const imagePreloadCache = new Map();

const CORS_PROXIES = {
    allorigins: 'https://api.allorigins.win/get?url=',
    corsproxy: 'https://corsproxy.io/?',
    thingproxy: 'https://thingproxy.freeboard.io/fetch/'
};

const IT_CONNECT_RSS = 'https://www.it-connect.fr/feed/';

const CACHED_ARTICLES = [
    {
        title: "IFA 2025 – Geekom A9 Mega : le mini PC le plus puissant du monde ?",
        link: "https://www.it-connect.fr/ifa-2025-geekom-a9-mega-le-mini-pc-le-plus-puissant-du-monde/",
        description: "Lors de l'IFA 2025, Geekom va dévoiler son modèle Geekom A9 Mega, une alternative à l'Apple Mac Studio, et deux laptops : GeekBook X14 Pro et X16 Pro.",
        pubDate: "6 septembre 2025",
        category: "Matériel",
        imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=250&fit=crop"
    }
];

const DEFAULT_IMAGE_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQ5OGRiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JVC1Db25uZWN0PC90ZXh0Pjwvc3ZnPg==';

function selectImageWithVariation(imageArray, fallbackKey = null) {
    if (!imageArray || imageArray.length === 0) {
        return selectImageWithVariation(DEFAULT_IMAGES, 'default');
    }
    
    const availableImages = imageArray.filter(img => !imageCache.used.has(img));
    
    let selectedImage;
    if (availableImages.length > 0) {
        selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    } else {
        if (imageCache.used.size >= imageCache.resetThreshold) {
            imageCache.used.clear();
        }
        selectedImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    }
    
    imageCache.used.add(selectedImage);
    return selectedImage;
}

function getEnhancedSmartImage(title, category) {
    const titleLower = title.toLowerCase();
    const categoryLower = category.toLowerCase();
    
    const keywordPriority = [
        'ransomware', 'malware', 'phishing', 'cyberattaque', 'hack',
        'windows', 'microsoft', 'office', 'outlook', 'powershell',
        'linux', 'ubuntu', 'debian',
        'réseau', 'serveur', 'firewall', 'routeur', 'switch',
        'cloud', 'azure', 'aws'
    ];
    
    for (const keyword of keywordPriority) {
        if (titleLower.includes(keyword) && ENHANCED_IMAGE_DATABASE[keyword]) {
            return selectImageWithVariation(ENHANCED_IMAGE_DATABASE[keyword], keyword);
        }
    }
    
    for (const [cat, images] of Object.entries(ENHANCED_IMAGE_DATABASE)) {
        if (categoryLower.includes(cat)) {
            return selectImageWithVariation(images, cat);
        }
    }
    
    return selectImageWithVariation(DEFAULT_IMAGES, 'default');
}

async function preloadAndCacheImage(imageUrl, title) {
    if (imagePreloadCache.has(imageUrl)) {
        return Promise.resolve(imageUrl);
    }
    
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
            imagePreloadCache.set(imageUrl, {
                url: imageUrl,
                loaded: true,
                timestamp: Date.now(),
                title: title
            });
            resolve(imageUrl);
        };
        
        img.onerror = () => {
            const fallbackImage = selectImageWithVariation(DEFAULT_IMAGES, 'fallback');
            resolve(fallbackImage);
        };
        
        img.src = imageUrl;
        
        setTimeout(() => {
            if (!imagePreloadCache.has(imageUrl)) {
                const fallbackImage = selectImageWithVariation(DEFAULT_IMAGES, 'timeout');
                resolve(fallbackImage);
            }
        }, 5000);
    });
}

async function getSmartImageWithCache(title, category) {
    const smartImageUrl = getEnhancedSmartImage(title, category);
    
    try {
        const cachedImageUrl = await preloadAndCacheImage(smartImageUrl, title);
        return cachedImageUrl;
    } catch (error) {
        return selectImageWithVariation(DEFAULT_IMAGES, 'error');
    }
}

function extractImageFromDescription(description) {
    if (!description) return null;
    
    try {
        const cleanedDescription = description.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanedDescription;
        const imgElement = tempDiv.querySelector('img');
        
        if (imgElement && imgElement.src) {
            let imageUrl = imgElement.src;
            if (imageUrl.startsWith('/')) {
                imageUrl = 'https://www.it-connect.fr' + imageUrl;
            } else if (!imageUrl.startsWith('http')) {
                imageUrl = 'https://www.it-connect.fr/' + imageUrl;
            }
            return imageUrl;
        }
    } catch (error) {
        console.log('Erreur extraction image:', error);
    }
    
    return null;
}

function extractEnclosureImage(item) {
    const enclosure = item.querySelector('enclosure');
    if (enclosure) {
        const type = enclosure.getAttribute('type');
        const url = enclosure.getAttribute('url');
        
        if (type && type.startsWith('image/') && url) {
            return url;
        }
    }
    return null;
}

function cleanRSSDescription(description) {
    if (!description) return 'Description non disponible';
    
    return description
        .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        .replace(/<[^>]*>/g, '')
        .replace(/&#8211;/g, '–')
        .replace(/&#038;/g, '&')
        .replace(/&#8217;/g, "'")
        .trim()
        .substring(0, 150) + '...';
}

function formatDate(pubDateStr) {
    if (!pubDateStr) return 'Récemment';
    
    try {
        const date = new Date(pubDateStr);
        if (isNaN(date.getTime())) return 'Récemment';
        
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return 'Récemment';
    }
}

async function parseRSSFeedImprovedWithSmartImages(xmlString) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            console.error('Erreur parsing XML:', parserError.textContent);
            return [];
        }
        
        const items = xmlDoc.querySelectorAll('item');
        const articlesPromises = [];
        
        items.forEach((item, index) => {
            if (index < 6) {
                const title = item.querySelector('title')?.textContent || 'Titre non disponible';
                const link = item.querySelector('link')?.textContent || '#';
                const description = item.querySelector('description')?.textContent || '';
                const pubDate = item.querySelector('pubDate')?.textContent || '';
                const category = item.querySelector('category')?.textContent || 'IT-Connect';
                
                const articlePromise = (async () => {
                    let imageUrl = null;
                    
                    imageUrl = extractEnclosureImage(item);
                    
                    if (!imageUrl) {
                        imageUrl = extractImageFromDescription(description);
                    }
                    
                    if (!imageUrl) {
                        imageUrl = await getSmartImageWithCache(title, category);
                    }
                    
                    return {
                        title: title.replace(/&#8211;/g, '–').replace(/&#038;/g, '&'),
                        link: link.trim(),
                        description: cleanRSSDescription(description),
                        pubDate: formatDate(pubDate),
                        category: category,
                        imageUrl: imageUrl
                    };
                })();
                
                articlesPromises.push(articlePromise);
            }
        });
        
        const articles = await Promise.all(articlesPromises);
        return articles;
    } catch (error) {
        console.error('Erreur parsing RSS:', error);
        return [];
    }
}

function displayITConnectArticles(articles) {
    const container = document.getElementById('articles-grid');
    const loading = document.getElementById('articles-loading');
    
    if (loading) loading.style.display = 'none';
    
    if (!container) {
        console.error('Container articles-grid non trouvé');
        return;
    }
    
    if (articles.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #bdc3c7;">Aucun article trouvé.</p>';
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <article class="article-card">
            <img src="${article.imageUrl}" alt="${article.title}" 
                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0;"
                 onerror="this.src='${DEFAULT_IMAGE_SVG}'"
                 loading="lazy">
            <div class="article-content">
                <h3 class="titre-article">${article.title}</h3>
                <div class="article-meta">
                    <span class="category"><i class="fas fa-tag"></i> ${article.category}</span>
                    <span style="margin-left: 10px;"><i class="fas fa-calendar"></i> ${article.pubDate}</span>
                </div>
                <p>${article.description}</p>
                <a href="${article.link}" class="read-more" target="_blank" rel="noopener">
                    Lire la suite <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

function showArticlesError(message) {
    const errorDiv = document.getElementById('articles-error');
    const loading = document.getElementById('articles-loading');
    
    if (loading) loading.style.display = 'none';
    
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Information :</strong> ${message}
        `;
    }
}

async function loadITConnectArticlesWithEnhancedFallback() {
    const loading = document.getElementById('articles-loading');
    const errorDiv = document.getElementById('articles-error');
    
    if (loading) loading.style.display = 'block';
    if (errorDiv) errorDiv.style.display = 'none';
    
    const proxiesToTest = [
        { 
            name: 'AllOrigins', 
            url: CORS_PROXIES.allorigins, 
            parseResponse: async (response) => {
                const data = await response.json();
                if (!data.contents || data.contents.length < 100) {
                    throw new Error('Contenu RSS invalide ou vide');
                }
                return data.contents;
            }
        },
        { 
            name: 'CORS Proxy', 
            url: CORS_PROXIES.corsproxy, 
            parseResponse: async (response) => {
                const text = await response.text();
                if (!text || text.length < 100) {
                    throw new Error('Contenu RSS invalide ou vide');
                }
                return text;
            }
        },
        { 
            name: 'ThingProxy', 
            url: CORS_PROXIES.thingproxy, 
            parseResponse: async (response) => {
                const text = await response.text();
                if (!text || text.length < 100) {
                    throw new Error('Contenu RSS invalide ou vide');
                }
                return text;
            }
        }
    ];
    
    for (const proxy of proxiesToTest) {
        try {
            console.log(`🔄 Tentative de chargement via ${proxy.name}...`);
            
            const response = await fetch(proxy.url + encodeURIComponent(IT_CONNECT_RSS), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*'
                },
                timeout: 10000
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const xmlContent = await proxy.parseResponse(response);
            
            if (xmlContent && xmlContent.includes('<rss')) {
                const articles = await parseRSSFeedImprovedWithSmartImages(xmlContent);
                
                if (articles.length > 0) {
                    console.log(`✅ SUCCÈS avec ${proxy.name}: ${articles.length} articles trouvés`);
                    displayITConnectArticles(articles);
                    
                    if (loading) loading.style.display = 'none';
                    return;
                }
            }
            
            throw new Error('Contenu RSS invalide ou vide');
            
        } catch (error) {
            console.log(`❌ ${proxy.name} a échoué:`, error.message);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('⚠️ Tous les proxies ont échoué, affichage des articles en cache...');
    
    const enhancedCachedArticles = await Promise.all(
        CACHED_ARTICLES.map(async (article) => ({
            ...article,
            imageUrl: await getSmartImageWithCache(article.title, article.category)
        }))
    );
    
    showArticlesError('Impossible de charger les articles en temps réel. Articles récents affichés depuis le cache.');
    displayITConnectArticles(enhancedCachedArticles);
}

function loadITConnectArticles() {
    loadITConnectArticlesWithEnhancedFallback();
}

function cleanImageCache() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000;
    
    let cleaned = 0;
    for (const [url, data] of imagePreloadCache.entries()) {
        if (now - data.timestamp > maxAge) {
            imagePreloadCache.delete(url);
            cleaned++;
        }
    }
    
    if (cleaned > 0) {
        console.log(`🧹 Cache nettoyé: ${cleaned} images supprimées`);
    }
}

setInterval(cleanImageCache, 15 * 60 * 1000);

// ===== INITIALISATION =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation des systèmes de veille technologique');
    
    setTimeout(() => {
        fetchEmergingTechnologies();
        loadITConnectArticlesWithEnhancedFallback();
    }, 1000);
});

setInterval(() => {
    console.log('🔄 Actualisation automatique Technologies Émergentes');
    fetchEmergingTechnologies();
}, 20 * 60 * 1000);

setInterval(() => {
    console.log('🔄 Actualisation automatique IT-Connect');
    loadITConnectArticlesWithEnhancedFallback();
}, 10 * 60 * 1000);