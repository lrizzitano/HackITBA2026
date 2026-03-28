import { evaluarMarca } from '../services/evaluacionService.js';

export async function getEvaluacion(req, res) {
  try {
    const { nombre, rubro, ubicacion, relacionCalidadPrecio } = req.query;
    console.log(req.query)
    if (!nombre || !rubro || !ubicacion || !relacionCalidadPrecio) {
      return res.status(400).json({
        error: 'Faltan campos requeridos'
      });
    }

    const resultado = await evaluarMarca({
      nombre,
      rubro,
      ubicacion,
      relacionCalidadPrecio
    });

    return res.json(resultado);

  } catch (error) {
    console.error('Error en evaluar:', error);

    return res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
}