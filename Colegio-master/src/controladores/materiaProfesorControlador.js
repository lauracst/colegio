const Joi = require('joi');
const { MateriaProfesor } = require('../baseDatos/index');

const validadorRegistro = Joi.object({
    documento_profesor: Joi.string().min(8).max(10).required().messages({
        'string.base': 'El documento del profesor debe ser un texto.',
        'string.empty': 'El documento del profesor es obligatorio.',
        'string.min': 'El documento del profesor debe tener al menos {#limit} caracteres.',
        'string.max': 'El documento del profesor no puede tener más de {#limit} caracteres.',
        'any.required': 'El documento del profesor es un campo obligatorio.'
    }),
    
    id_materia: Joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la materia debe ser un número entero positivo.',
        'number.integer': 'El ID de la materia debe ser un número entero positivo.',
        'number.positive': 'El ID de la materia debe ser un número entero positivo.',
        'any.required': 'El ID de la materia es un campo obligatorio.'
    }),
    
    fecha_asignacion: Joi.date().iso().less('now').required().messages({
        'date.base': 'La fecha de asignación debe ser una fecha válida.',
        'date.format': 'La fecha debe tener el formato YYYY-MM-DD.',
        'date.less': 'La fecha de asignación no puede ser en el futuro.',
        'any.required': 'La fecha de asignación es un campo obligatorio.'
    })
});

module.exports = validadorRegistro;

// POST - Registrar matria con profesor
const registrarMateriaProfesor = async (req, res) => {
    try {
      const { error } = validadorRegistro.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            id_materia_profesor: '',
            documento_profesor: '',
            id_materia: '',
            fecha_asignacion: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { id_materia_profesor, documento_profesor, id_materia, fecha_asignacion } = req.body;
  
      const materiaProfesorExistente = await MateriaProfesor.findByPk(id_materia_profesor);
      if (materiaProfesorExistente) {
        return res.status(400).json({ mensaje: 'La materia con profesor ya existe', resultado: null });
      }
  
      const nuevoMateriaProfesor = await MateriaProfesor.create({ id_materia_profesor, documento_profesor, id_materia, fecha_asignacion });
  
      res.status(201).json({
        mensaje: 'Estudiante creado',
        resultado: {
            id_materia_profesor: nuevoMateriaProfesor.id_materia_profesor,
            documento_profesor: nuevoMateriaProfesor.documento_profesor,
            id_materia: nuevoMateriaProfesor.id_materia,
            fecha_asignacion: nuevoMateriaProfesor.fecha_asignacion,
            erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

// GET - Obtener todas las materias con profesores
const listarMateriaProdeor = async (req, res) => {
    try {
      const materiaProfesor = await MateriaProfesor.findAll();
      res.status(200).json({ mensaje: 'Materias profesor listadas', resultado: materiaProfesor });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

// PUT - Actualizar materia con profesor
const actualizarMateriaProfesor = async (req, res) => {
    try {
      const { id_materia_profesor } = req.params;
      const { documento_profesor, id_materia, fecha_asignacion } = req.body;
  
      const materiaProfesor = await MateriaProfesor.findByPk(id_materia_profesor);
      if (!materiaProfesor) {
        return res.status(404).json({ mensaje: 'Materia con profesor no encontrada', resultado: null });
      }
  
      await MateriaProfesor.update({ documento_profesor, id_materia, fecha_asignacion }, { where: { id_materia_profesor } });
      const actualizarMateriaProfesor = await MateriaProfesor.findByPk(id_materia_profesor);
  
      res.status(200).json({ mensaje: 'Materia con profesro actualizada', resultado: actualizarMateriaProfesor });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

// DELETE - Borrar materia con profesor
const borrarMateriaProfesor = async (req, res) => {
    try {
      const { id_materia_profesor } = req.params;
  
      const materiaProfesor = await MateriaProfesor.findByPk(id_materia_profesor);
      if (!materiaProfesor) {
        return res.status(404).json({ mensaje: 'Materia con profesor no encontrada', resultado: null });
      }
  
      await materiaProfesor.destroy({ where: { id_materia_profesor } });
      res.status(200).json({ mensaje: 'Materia con profesor eliminada', resultado: null });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

  module.exports = {
    registrarMateriaProfesor,
    listarMateriaProdeor,
    actualizarMateriaProfesor,
    borrarMateriaProfesor
  };