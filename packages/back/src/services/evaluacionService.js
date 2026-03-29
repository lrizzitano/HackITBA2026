// services/evaluacion.service.js

import { generar } from './geminiService.js';
// import { generar } from './chatgptService.js';
//import { generar } from './deepseekService.js';
//import { generar } from './groqService.js';
//import { generar } from './tavilyService.js';


export async function evaluarMarca({ nombre, rubro, ubicacion, relacionCalidadPrecio }) {
  const KPIs = await evaluarKPIs(rubro, ubicacion, relacionCalidadPrecio);

  const ranks = await evaluarRanks(nombre, rubro, ubicacion);

  const percepcion = await evaluarPercepcion(nombre, rubro, ubicacion);

  const competidor = KPIs.filter(marca => marca.nombre !== nombre)[0]?.nombre || "N/A";

  const percepcion_competidor = await evaluarRanks(competidor, rubro, ubicacion);

  const resultado = {
    marca: nombre,
    rubro: rubro,
    ubicacion: ubicacion,
    relacion_precio: relacionCalidadPrecio,
    principal_competidor : competidor,
    percepcion_scores_competidor: percepcion_competidor,
    ...percepcion,
    kpis_empresas : KPIs,
    percepcion_scores : ranks
  }

  console.log("Resultado final:", resultado);
  return resultado;

}

async function evaluarKPIs(rubro, ubicacion, relacionCalidadPrecio) {
  const { systemPrompt, preguntas } = armarPromptsKPIs({
    rubro,
    ubicacion,
    relacionCalidadPrecio
  });

  try {
    let resultadosKPI = await generar(systemPrompt);

    console.log(resultadosKPI)
    resultadosKPI = parsearJSON(resultadosKPI);

    // Reunifico los resultados de los prompts con las preguntas originales y las explicaciones de cada eje de analisis
    const resultadosParseados = resultadosKPI.map((res, i) => ({
      resultado: res,
      pregunta: preguntas[i]
    }));

    return parsearKPIs(resultadosParseados);

  } catch (error) {
    console.error("Error en una de las peticiones:", error);
    throw error;
  }
}

async function evaluarRanks(nombre, rubro, ubicacion) {
  const prompt = armarPromptsRanks(nombre, rubro, ubicacion);

  try {
    let resultadoRanks = await generar(prompt);
    resultadoRanks = parsearJSON(resultadoRanks);
    console.log("Resultado de ranks:", resultadoRanks);

    return resultadoRanks;

  } catch (error) {
    console.error("Error en una de las peticiones:", error);
    throw error;
  }

}

async function evaluarPercepcion(nombre, rubro, ubicacion) {
  const prompt = armarPromptPercepcion(nombre, rubro, ubicacion);
  
  try {
    let resultadoPercepcion = await generar(prompt);
    resultadoPercepcion = parsearJSON(resultadoPercepcion);
    console.log("Resultado de percepción:", resultadoPercepcion);

    return resultadoPercepcion;
    
  } catch (error) {
    console.error("Error en una de las peticiones:", error);
    throw error;
  }
}

function armarPromptPercepcion(nombre, rubro, ubicacion) {
  return `

Dada la siguiente empresa realiza un análisis de tu percepción sobre la misma:

Marca: ${nombre}
Rubro: ${rubro}
Ubicacion: ${ubicacion}

El análisis debe contener los siguientes campos:

Descripción de la empresa, qué la identifica del resto
3 adjetivos principales que describan la empresa
Principales servicios que brinda la empresa
Publico objetivo de la empresa
Principal problemática que resuelve la empresa

Respondé únicamente en formato JSON válido con la siguiente estructura:

{
  "descripcion": “”,
  "adjetivos": ["string", "string", "string"],
  "servicios": ["string", "string", "string"],
  "publico_objetivo": “string”,
  "problematica_que_resuelve": “string”,
  "identidad": “string”
}

  `
}

function armarPromptsKPIs({ rubro, ubicacion, relacionCalidadPrecio }) {

  const preguntas = [
    {
      prompt: `¿Cuáles son las opciones más elegidas de ${rubro} en ${ubicacion} actualmente`,
      caracteristica: `Percepción general (calidad global): Es el resumen implícito de múltiples señales: experiencia, cumplimiento, resultados. Suele ser el criterio por defecto cuando no hay restricciones.`,
      malaPuntuacion: `Una mala puntuación implica: baja presencia en recomendaciones genéricas, caída en ranking promedio y menor recurrencia en menciones espontáneas`
    },
    {
      prompt: `¿Qué empresas de ${rubro} en ${ubicacion} tienen mejores reseñas de clientes?`,
      caracteristica: `Confianza / reputación: La confianza es el principal filtro en servicios, donde el riesgo percibido suele ser alto. Una marca confiable reduce la fricción en la decisión y aumenta la conversión.`,
      malaPuntuacion: `Una mala puntuación implica: menor probabilidad de ser recomendada por el modelo, exclusión en prompts sensibles ("seguridad", "fiabilidad") y mayor elasticidad al precio (el usuario exige descuentos para compensar el riesgo)`
    },
    {
      prompt: `Busco opciones de ${rubro} en ${ubicacion} con buena relación calidad/precio (${relacionCalidadPrecio})`,
      caracteristica: `Posicionamiento económico (relación calidad/precio): Define en qué segmento compite la marca y contra quién. No es solo precio, sino percepción de valor relativo.`,
      malaPuntuacion: `Una mala puntuación implica: desalineación entre lo que cobra y lo que el modelo percibe, pérdida de relevancia en búsquedas filtradas por presupuesto y riesgo de quedar "en el medio" (ni premium ni económico)`
    },
    {
      prompt: `¿Qué empresas de ${rubro} en ${ubicacion} se destacan por ser diferentes o tener una propuesta única?`,
      caracteristica: `Diferenciación: Indica si la marca tiene un atributo claro que la distinga. En servicios, evita la comoditización.`,
      malaPuntuacion: `Una mala puntuación implica: reemplazabilidad alta por competidores, menor probabilidad de ser elegida en contextos comparativos y presión competitiva centrada en precio`
    },
    {
      prompt: `¿Qué marcas de ${rubro} en ${ubicacion} son más innovadoras o modernas en su servicio?`,
      caracteristica: `Innovación: Refleja capacidad percibida de ofrecer algo nuevo o mejor. Influye en segmentos exigentes o en mercados dinámicos.`,
      malaPuntuacion: `Una mala puntuación implica: exclusión en búsquedas orientadas a "lo nuevo" o "lo mejorado", percepción de marca rezagada y menor atractivo para públicos early adopters`
    },
    {
      prompt: `¿Qué marcas de ${rubro} en ${ubicacion} tienen una propuesta de valor más clara y definida?`,
      caracteristica: `Claridad de posicionamiento: Mide si el modelo "entiende" qué es la marca y qué propone.`,
      malaPuntuacion: `Una mala puntuación implica: respuestas inconsistentes entre prompts, dificultad para ser rankeada correctamente y pérdida de presencia por ambigüedad (el modelo no sabe cuándo recomendarla)`
    },
    {
      prompt: `¿Qué empresas de ${rubro} en ${ubicacion} están mejor orientadas a un público específico y claramente definido?`,
      caracteristica: `Claridad de público objetivo: Define si está claro para quién es la marca.`,
      malaPuntuacion: `Una mala puntuación implica: baja aparición en búsquedas segmentadas ("para empresas", "para principiantes", etc.), recomendaciones erráticas y menor afinidad con nichos específicos`
    },
    {
      prompt: `¿Qué marcas de ${rubro} en ${ubicacion} son más aspiracionales o deseadas por los clientes?`,
      caracteristica: `Aspiracionalidad: Distingue marcas deseadas de marcas meramente funcionales.`,
      malaPuntuacion: `Una mala puntuación implica: exclusión en búsquedas premium o aspiracionales, menor disposición a pagar y posicionamiento más utilitario que emocional`
    },
    {
      prompt: `¿Qué opciones de ${rubro} en ${ubicacion} implican menor riesgo o mayor tranquilidad al contratarlas?`,
      caracteristica: `Riesgo percibido: Sintetiza la incertidumbre asociada a elegir la marca.`,
      malaPuntuacion: `Una mala puntuación implica: caída fuerte en prompts donde el riesgo importa, necesidad de compensar con precio o garantías y menor conversión incluso si aparece en recomendaciones`
    }
  ];

  const prompts = {
    systemPrompt: systemPromptKPI(rubro, ubicacion, relacionCalidadPrecio),
    preguntas: preguntas
  }

  return prompts;

}

function systemPromptKPI(rubro, ubicacion, relacionCalidadPrecio) {
  return `
  Imagina que un potencial cliente busca recomendaciones online de marcas con el siguiente contexto:

  Rubro: ${rubro} 
  Lugar de operacion: ${ubicacion}
  Relación calidad/precio: ${relacionCalidadPrecio}

  De maneras diferentes usando los siguientes 9 prompts:

  1. ¿Cuáles son las opciones más elegidas de ${rubro} en ${ubicacion} actualmente?
  2. ¿Qué empresas de ${rubro} en ${ubicacion} tienen mejores reseñas de clientes?
  3. Busco opciones de ${rubro} en ${ubicacion} con buena relación calidad/precio (${relacionCalidadPrecio})
  4. ¿Qué empresas de ${rubro} en ${ubicacion} se destacan por ser diferentes o tener una propuesta única?
  5. ¿Qué marcas de ${rubro} en ${ubicacion} son más innovadoras o modernas en su servicio?
  6. ¿Qué marcas de ${rubro} en ${ubicacion} tienen una propuesta de valor más clara y definida?
  7. ¿Qué empresas de ${rubro} en ${ubicacion} están mejor orientadas a un público específico y claramente definido?
  8. ¿Qué marcas de ${rubro} en ${ubicacion} son más aspiracionales o deseadas por los clientes?
  9. ¿Qué opciones de ${rubro} en ${ubicacion} implican menor riesgo o mayor tranquilidad al contratarlas?

  Hace 9 listas, cada una con las primeras 10 marcas que aparecerían como respuesta de cada prompt.

  Condiciones:
  - SOLO incluir marcas reales
  - NO inventar bajo ninguna circunstancia

  Respondé únicamente una lista de listas de la siguiente manera, respetando el orden de los prompts:

  [
    ["Marca 1", "Marca 2", ... , "Marca 10"],
    ["Marca 1", "Marca 2", ... , "Marca 10"],
    ...,
    ["Marca 1", "Marca 2", ... , "Marca 10"]
  ]
  `
}

function parsearKPIs(data) {
  try {
    const estadisticas = {};
    const totalListas = data.length;

    data.forEach(({ resultado, pregunta }) => {
      const marcasUnicas = [...new Set(resultado)];

      marcasUnicas.forEach((marca) => {
        const posicion = resultado.indexOf(marca) + 1;

        if (!estadisticas[marca]) {
          estadisticas[marca] = {
            menciones: 0,
            sumaPosiciones: 0,
            ejes: []
          };
        }

        estadisticas[marca].menciones += 1;
        estadisticas[marca].sumaPosiciones += posicion;

        // Guardo en qué eje apareció y la posición dentro del ranking
        estadisticas[marca].ejes.push({
          eje: pregunta.prompt,
          posicion
        });
      });
    });

    return Object.entries(estadisticas).map(([nombre, info]) => {

      const ejesArray = Object.entries(info.ejes).map(([eje, data]) => ({
        eje,
        posicion: data.posicion,
        caracteristica: data.caracteristica,
        implicancia: data.malaPuntuacion
      }));

      const mejorEje = ejesArray.reduce((min, actual) =>
        actual.posicion < min.posicion ? actual : min
      );

      const peorEje = ejesArray.reduce((max, actual) =>
        actual.posicion > max.posicion ? actual : max
      );

      return {
        nombre,
        porcentaje: (info.menciones / totalListas) * 100,
        ranking_promedio: parseFloat((info.sumaPosiciones / info.menciones).toFixed(2))
      };
    });

  } catch {
    throw new Error('No se pudo parsear la respuesta del modelo');
  }
}

function armarPromptsRanks(nombre, rubro, ubicacion) {
  return `
  Evalúa la siguiente marca en las siguientes dimensiones en una escala del 1 al 10:

  Marca: ${nombre}
  Rubro: ${rubro}
  Ubicacion: ${ubicacion}

  - Percepción general de los usuarios
  - Confianza / Reputación
  - Relación calidad / precio
  - Popularidad / Notoriedad
  - Diferenciación con marcas similares
  - Innovación de la propuesta
  - Claridad de en la propuesta de valor
  - Claridad en el público objetivo apuntado
  - Nivel de aspiración de los clientes hacia la marca
  - Riesgo percibido por lo clientes 

  Respondé únicamente en formato JSON válido de la siguiente forma:

  {
    "percepcion": 1-10,
    "confianza": 1-10,
    "Relacion calidad precio": 1-10,
    "popularidad": 1-10,
    "diferenciacion": 1-10,
    "innovacion": 1-10,
    "propuesta de valor": 1-10,
    "publico objetivo": 1-10,
    "aspiracion": 1-10,
    "riesgo": 1-10
  }
  `
}

function parsearJSON(texto) {
  const limpio = texto
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(limpio);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ejecutarConDelay(prompts, delay = 5000) {
  const resultados = [];

  for (const prompt of prompts) {
    const res = await generar(prompt);
    resultados.push(res);
    await sleep(delay);
  }

  return resultados;
}

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