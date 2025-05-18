const Joi = require('joi');
const { InscripcionMateria } = require('../baseDatos/index');

const validadorInscripcion = Joi.object({
    documento_estudiante: Joi.number().integer().required().messages({
        'number.base': 'El ID del estudiante debe ser un número entero.',
        'number.integer': 'El ID del estudiante debe ser un número entero.',
        'any.required': 'El ID del estudiante es un campo obligatorio.'
    }),
    id_materia: Joi.number().integer().required().messages({
        'number.base': 'El ID de la materia debe ser un número entero.',
        'number.integer': 'El ID de la materia debe ser un número entero.',
        'any.required': 'El ID de la materia es un campo obligatorio.'
    }),
});

module.exports = validadorInscripcion;

// POST - Registrar inscripción de materia  
const registrarInscripcionMateria = async (req, res) => {
    try {
      const { error } = validadorInscripcion.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            id_inscripcion: '',
            documento_estudiante: '',
            id_materia: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { id_inscripcion, documento_estudiante, id_materia } = req.body;
  
      const inscripcionMateriasExistente = await InscripcionMateria.findByPk(id_inscripcion);
      if (inscripcionMateriasExistente) {
        return res.status(400).json({ mensaje: 'La materia ya esta inscrita', resultado: null });
      }
  
      const nuevoInscripcionMatera = await InscripcionMateria.create({ id_inscripcion, documento_estudiante, id_materia });
  
      res.status(201).json({
        mensaje: 'Materia inscrita',
        resultado: {
          id_inscripcion: nuevoInscripcionMatera.id_inscripcion,
          documento_estudiante: nuevoInscripcionMatera.documento_estudiante,
          id_materia: nuevoInscripcionMatera.id_materia,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

// GET - Obtener todas las inscripciones de materias
const listarInscripcionMateria = async (req, res) => {
  try {
    const inscripcionMateria = await InscripcionMateria.findAll();
    res.status(200).json({ mensaje: 'Materias incritas listados', resultado: inscripcionMateria });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

// PUT - Actualizar inscripción de materia
const actualizarInscipcionMateria = async (req, res) => {
  try {
    const { id_inscripcion } = req.params;
    const { documento_estudiante, id_materia } = req.body;

    const inscripcionMateria = await InscripcionMateria.findByPk(id_inscripcion);
    if (!inscripcionMateria) {
      return res.status(404).json({ mensaje: 'Inscripción de materia no encontrada', resultado: null });
    }

    await InscripcionMateria.update(
      { documento_estudiante, id_materia },
      { where: { id_inscripcion } }
    );

    const inscripcionMateriaActualizado = await InscripcionMateria.findByPk(id_inscripcion);

    res.status(200).json({ mensaje: 'Inscripción de materia actualizada', resultado: inscripcionMateriaActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

// DELETE - Eliminar inscripción de materia
const borrarInscripcionMateria = async (req, res) => {
  try {
    const { id_inscripcion } = req.params;

    const inscripcionMateria = await InscripcionMateria.findByPk(id_inscripcion);
    if (!inscripcionMateria) {
      return res.status(404).json({ mensaje: 'Inscripcion de materia no encontrada', resultado: null });
    }

    await InscripcionMateria.destroy({ where: { id_inscripcion } });
    res.status(200).json({ mensaje: 'Inscripcion de materia eliminada', resultado: null });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};


module.exports = {
    registrarInscripcionMateria,
    listarInscripcionMateria,
    actualizarInscipcionMateria,
    borrarInscripcionMateria
};
