import axios from 'axios';
import 'dotenv/config';

const JINA_API_KEY = process.env.JINA_API_KEY;

export async function getMarkdownContent(url) {
    try {
        const response = await axios.get(`https://r.jina.ai/${url}`, {
            headers: {
                'Authorization': `Bearer ${JINA_API_KEY}`,
                'X-Return-Format': 'markdown' // Forzamos formato markdown
            }
        });

        let content = response.data;
        
        // regex saca imagenes
        content = content.replace(/!\[.*?\]\(.*?\)/g, '');
        
        // regex saca links
        content = content.replace(/\[(.*?)\]\(.*?\)/g, '$1');

        // limitar a los primeros 4000 caracteres (suficiente para una Landing)
        return content.substring(0, 4000).trim();

    } catch (error) {
        console.error("Error en Jina Reader:", error.message);
        return "Error: No se pudo acceder al contenido de la web.";
    }
}