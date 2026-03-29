// services/evaluacion.service.js

import { generar } from './geminiService.js';

export async function evaluarMarca({ nombre, rubro, ubicacion, relacionCalidadPrecio }) {
  const prompts = armarPromptsKPIs({ nombre, rubro, ubicacion, relacionCalidadPrecio });

  try {
    const tareas = prompts.map(prompt => generar(prompt)); // array de promesas

    let resultados = await Promise.all(tareas); // las corro en paralelo
    console.log(resultados)


    resultados = resultados.map(res => parsearJSON(res));

    console.log(resultados)
    
    return parsearKPIs(resultados);

  } catch (error) {
    console.error("Error en una de las peticiones:", error);
    throw error;
  }
}

function armarPromptsKPIs({ nombre, rubro, ubicacion, relacionCalidadPrecio }) {

  let prompts = [];



  // TODO: poner bien los prompts aca
  return ["dame una lista de 10 marcas de ropa en este formato: un array de 10 elementos donde cada elemento es una strng, nada mas",
    "dame una lista de 10 marcas de ropa en este formato: un array de 10 elementos donde cada elemento es una strng, nada mas",
    "dame una lista de 10 marcas de ropa en este formato: un array de 10 elementos donde cada elemento es una strng., nada mas"]
}

function systemPromptKPI(rubro, ubicacion, relacion, promptParticular) {
  return ```
  Imagina que un potencial cliente busca recomendaciones online de marcas con el siguiente contexto:

  Rubro: ${rubro} 
  Lugar de operacion: ${ubicacion}
  Relación calidad/precio: ${relacion}

  Para ello, redacta el siguiente prompt para hacer en este LLM:

  “${promptParticular}” 

  Condiciones:
  - SOLO incluir marcas reales
  - NO inventar bajo ninguna circunstancia

  Lista las primeras 10 marcas que aparecerían como resultado  

  Respondé únicamente en formato array de la siguiente manera:

  [“Marca 1”, “Marca 2”, ... , “Marca 10”]
  ```
}

function parsearKPIs(resultados) {
  try {
      const estadisticas = {}; 
      const totalListas = resultados.length; 

      resultados.forEach((lista) => {
        const marcasUnicasEnLista = [...new Set(lista)];
    
        marcasUnicasEnLista.forEach((marca) => {
          const posicion = lista.indexOf(marca) + 1;
    
          if (!estadisticas[marca]) {
            estadisticas[marca] = { menciones: 0, sumaPosiciones: 0 };
          }
    
          estadisticas[marca].menciones += 1;
          estadisticas[marca].sumaPosiciones += posicion;
        });
      });
    
      // Transformamos el objeto en el array de JSONs final
      const rankingFinal = Object.keys(estadisticas).map((nombre) => {
        const info = estadisticas[nombre];
        return {
          nombre: nombre,
          porcentajeMenciones: (info.menciones / totalListas) * 100,
          rankingPromedio: parseFloat((info.sumaPosiciones / info.menciones).toFixed(2))
        };
      });

      return rankingFinal;
  } catch {
    throw new Error('No se pudo parsear la respuesta del modelo');
  }
}

function parsearJSON(texto) {
    const limpio = texto
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(limpio);
  };

async function llamarAlJuez(url, data) {
  const systemPrompt = ```
  Actúa como un Chief Marketing Officer (CMO) y Estratega Senior experto en LLMEO (LLM Engine Optimization). Tu función es realizar auditorías de posicionamiento de marca en modelos de inteligencia artificial (IA).
  
  OBJETIVO:
  Debes analizar tres fuentes de datos: 1) El contenido actual de la landing page de la marca (Contexto Interno), 2) Los resultados de múltiples consultas o 'probes' realizados a diversos LLMs (Percepción Externa), y 3) Métricas cuantitativas de visibilidad y sentimiento. Tu meta es detectar por qué la marca es invisible o mal interpretada por la IA y dictar un plan de acción técnico y narrativo para revertirlo.
  
  REGLAS DE SALIDA:
  1. Responde ÚNICAMENTE con un objeto JSON válido.
  2. NO incluyas introducciones, comentarios, ni bloques de código de Markdown (sin \``` con json). Solo el texto del objeto.
  3. El campo 'score_general' debe ser un número entero de 0 a 100 basado en: Visibilidad (40%), Sentimiento (30%) y Calidad del Contenido Web (30%).
  4. Las recomendaciones deben ser accionables y técnicas (ej. 'Modificar tal H1', 'Agregar Schema.org', 'Crear FAQ semántica').
  
  ESTRUCTURA DE RESPUESTA REQUERIDA:
  {
    "conclusionJuez": {
      "resumen_ejecutivo": "string",
      "score_general": number,
      "veredicto": "string",
      "hallazgos_clave": ["string"],
      "evidencias_clave": ["string"],
      "brechas_detectadas": {
        "visibilidad": ["string"],
        "posicionamiento": ["string"],
        "diferenciacion": ["string"],
        "confianza": ["string"],
        "claridad_oferta": ["string"],
        "contenido_web": ["string"],
        "consistencia_marca": ["string"]
      },
      "fortalezas": ["string"],
      "debilidades": ["string"],
      "riesgos": ["string"],
      "oportunidades": ["string"],
      "comparacion_vs_competidor": {
        "competidor_referencia": "string",
        "ventaja_de_mi_empresa": ["string"],
        "desventaja_de_mi_empresa": ["string"],
        "gap_principal": "string"
      },
      "recomendaciones": {
        "inmediatas": ["string"],
        "corto_plazo": ["string"],
        "mediano_plazo": ["string"]
      },
      "plan_de_accion": [
        {
          "tarea": "string",
          "prioridad": "alta|media|baja",
          "impacto": "string",
          "esfuerzo": "Bajo|Medio|Alto",
          "justificacion": "string"
        }
      ],
      "confianza_del_analisis": number,
      "cobertura_de_fuentes": {
        "website": number,
        "menciones": number,
        "ranking": number,
        "preguntas": number
      },
      "impacto_estimado": {
        "visibilidad": "string",
        "ranking": "string",
        "conversion": "string"
      }
    }
  }
  
  1) Contenido de la landing page
  ${await getMarkdownContent(url)}
  
  2) Resultados de multiples consultas
  porcentaje de menciones = proporcion en que aparece en prompts preguntando por algun servicio del rubro
  posicionamiento: promedio de posicion en respuestas de a 10 marcas
  ${data}
  ```
}