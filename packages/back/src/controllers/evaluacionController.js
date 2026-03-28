import { evaluarMarca } from '../services/evaluacionService.js';

export async function getEvaluacion(req, res) {
  try {
    const { nombre, rubro, ubicacion, rangoPrecios } = req.body;

    if (!nombre || !rubro || !ubicacion || !rangoPrecios) {
      return res.status(400).json({
        error: 'Faltan campos requeridos'
      });
    }

    if (
      typeof rangoPrecios.min !== 'number' ||
      typeof rangoPrecios.max !== 'number'
    ) {
      return res.status(400).json({
        error: 'rangoPrecios debe tener { min: number, max: number }'
      });
    }

    const resultado = await evaluarMarca({
      nombre,
      rubro,
      ubicacion,
      rangoPrecios
    });

    return res.json(resultado);

  } catch (error) {
    console.error('Error en evaluar:', error);

    return res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
}