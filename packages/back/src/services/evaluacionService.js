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