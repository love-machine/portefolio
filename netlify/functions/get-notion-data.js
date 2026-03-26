const { Client } = require('@notionhq/client');

/**
 * Netlify Function — Récupère les articles de veille depuis Notion
 * Endpoint : /.netlify/functions/get-notion-data
 * Variables d'env requises : NOTION_API_KEY, NOTION_VEILLE_DATABASE_ID
 */

/**
 * Extrait le score depuis une propriété Notion quel que soit son type
 * (number, select, rich_text, formula, etc.) et retourne un entier 0-5.
 */
function extractScore(prop) {
  if (!prop) return 0;

  let raw;

  // Type "number"
  if (prop.type === 'number' && prop.number != null) {
    raw = prop.number;
  }
  // Type "select" → le nom contient le chiffre (ex: "4" ou "4/5")
  else if (prop.type === 'select' && prop.select?.name) {
    raw = prop.select.name;
  }
  // Type "rich_text"
  else if (prop.type === 'rich_text' && prop.rich_text?.[0]?.plain_text) {
    raw = prop.rich_text[0].plain_text;
  }
  // Type "formula" → peut retourner number ou string
  else if (prop.type === 'formula') {
    raw = prop.formula?.number ?? prop.formula?.string ?? 0;
  }
  // Fallback : essaie les champs courants directement
  else {
    raw = prop.number ?? prop.select?.name ?? prop.rich_text?.[0]?.plain_text ?? 0;
  }

  // Convertir en entier, extraire le premier nombre trouvé (gère "4/5", "4", 4)
  const parsed = parseInt(String(raw).match(/\d+/)?.[0], 10);
  return Number.isNaN(parsed) ? 0 : Math.min(Math.max(parsed, 0), 5);
}
exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Préflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    // Récupérer tous les articles, triés par date décroissante
    const response = await notion.databases.query({
      database_id: process.env.NOTION_VEILLE_DATABASE_ID,
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: 100,
    });

    const articles = response.results.map((page, idx) => {
      const props = page.properties;

      // --- Recherche case-insensitive de la propriété "score" ---
      const scoreKey = Object.keys(props).find(
        (k) => k.toLowerCase() === 'score'
      );

      // Log de debug pour le premier article (visible dans les logs Netlify)
      if (idx === 0) {
        console.log('🔍 Score key found:', scoreKey || 'NOT FOUND');
        if (scoreKey) {
          console.log('🔍 Score property raw:', JSON.stringify(props[scoreKey]));
        }
      }

      // --- Image : priorité cover > propriété "Image" > fallback ---
      let imageUrl = '';
      if (page.cover) {
        imageUrl =
          page.cover.type === 'external'
            ? page.cover.external.url
            : page.cover.file.url;
      } else if (props.Image?.files?.[0]) {
        const file = props.Image.files[0];
        imageUrl =
          file.type === 'external' ? file.external.url : file.file.url;
      }

      return {
        id: page.id,
        titre: props.titre?.title?.[0]?.plain_text || 'Sans titre',
        url: props.URL?.url || '',
        date: props.Date?.date?.start || new Date().toISOString(),
        source: props.source?.rich_text?.[0]?.plain_text || 'Non spécifié',
        technologies:
          props.technologie?.multi_select?.map((tag) => tag.name) || [],
        analyse: props.Analyse?.rich_text?.[0]?.plain_text || '',
        score: extractScore(scoreKey ? props[scoreKey] : null),
        image: imageUrl,
        notionUrl: page.url,
      };
    });

    console.log(`✅ ${articles.length} articles récupérés depuis Notion`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: articles.length,
        articles,
      }),
    };
  } catch (error) {
    console.error('❌ Erreur Notion:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Erreur lors de la récupération des articles',
        message: error.message,
      }),
    };
  }
};
