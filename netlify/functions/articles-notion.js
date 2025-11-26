const { Client } = require('@notionhq/client');

exports.handler = async function(event, context) {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Gestion OPTIONS (préflight CORS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Initialiser Notion
    const notion = new Client({
      auth: process.env.NOTION_API_KEY
    });

    // Récupérer SEULEMENT les 3 articles les plus récents
    const response = await notion.databases.query({
      database_id: process.env.NOTION_VEILLE_DATABASE_ID,
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ],
      page_size: 3 // Récupérer SEULEMENT les 3 plus récents
    });

    // Formater les articles selon TA structure Notion
    const articles = response.results.map(page => {
      const props = page.properties;
      
      return {
        id: page.id,
        
        // Titre
        titre: props.titre?.title?.[0]?.plain_text || 'Sans titre',
        
        // URL de l'article
        url: props.URL?.url || '',
        
        // Date
        date: props.Date?.date?.start || new Date().toISOString(),
        
        // Source (IT-Connect, etc.)
        source: props.source?.rich_text?.[0]?.plain_text || 'Non spécifié',
        
        // Technologies (tags multiples)
        technologies: props.technologie?.multi_select?.map(tag => tag.name) || [],
        
        // Analyse (description)
        analyse: props.Analyse?.rich_text?.[0]?.plain_text || '',
        
        // Score
        score: props.Score?.number || 0,
        
        // Intérêt professionnel
        interet_professionnel: props.interet_professionnel?.rich_text?.[0]?.plain_text || '',
        
        // Intérêt personnel
        interet_personnel: props['intérêt personnel']?.rich_text?.[0]?.plain_text || '',
        
        // URL Notion (pour lien vers la page Notion)
        notionUrl: page.url
      };
    });

    console.log(`✅ ${articles.length} articles récupérés depuis ta base Notion`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: articles.length,
        articles: articles
      })
    };

  } catch (error) {
    console.error('❌ Erreur Notion:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Erreur lors de la récupération des articles',
        message: error.message 
      })
    };
  }
};