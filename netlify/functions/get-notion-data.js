const { Client } = require('@notionhq/client');

/**
 * Netlify Function — Récupère les articles de veille depuis Notion
 * Endpoint : /.netlify/functions/get-notion-data
 * Variables d'env requises : NOTION_API_KEY, NOTION_VEILLE_DATABASE_ID
 */
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

    const articles = response.results.map((page) => {
      const props = page.properties;

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
        score: props.Score?.number || 0,
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
