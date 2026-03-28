// services/evaluacion.service.js

import { generar } from './geminiService.js';

export async function evaluarMarca({ nombre, rubro, ubicacion, rangoPrecios }) {
  const prompt = construirPrompt({ nombre, rubro, ubicacion, rangoPrecios });

  const texto = await generar(prompt);

  return parsearRespuesta(texto);
}

function construirPrompt({ nombre, rubro, ubicacion, rangoPrecios }) {
  return `
Realizá un análisis de marca de la siguiente empresa, enfocándote en sus principales características, su público objetivo y sus competidores:

Nombre: ${nombre}
Rubro: ${rubro}
Ubicación: ${ubicacion}

Respondé EXCLUSIVAMENTE en JSON válido con:

{
  "adjetivos": ["", "", ""],
  "publicoObjetivo": "",
  "competidores": ["", "", ""]
}
`;
}

function parsearRespuesta(texto) {
  try {
    const limpio = texto
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(limpio);

  } catch {
    throw new Error('No se pudo parsear la respuesta del modelo');
  }
}