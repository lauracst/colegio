const Joi = require('joi');
const { Materia } = require('../baseDatos/index');

const validadorRegistro = Joi.object({
    id_materia: Joi.number().integer().min(1).max(1000).required().messages({
        'number.base': 'El ID de la materia debe ser un número entero.',
        'number.empty': 'El ID de la materia es obligatorio.',
        'number.min': 'El ID de la materia debe ser al menos {#limit}.',
        'number.max': 'El ID de la materia no puede ser más de {#limit}.',
        'any.required': 'El ID de la materia es un campo obligatorio.'
    }),
    nombre: Joi.string().min(2).max(50).required().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.empty': 'El nombre es obligatorio.',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
        'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
        'any.required': 'El nombre es un campo obligatorio.'
    }),
    horas_semanales: Joi.number().integer().min(1).max(20).required().messages({
      'number.base': 'Las horas semanales deben ser un número entero.',
      'number.empty': 'Las horas semanales son obligatorias.',
      'number.min': 'Las horas semanales deben ser al menos {#limit}.',
      'number.max': 'Las horas semanales no pueden ser más de {#limit}.',
      'any.required': 'Las horas semanales son un campo obligatorio.'
    }),
    descripcion: Joi.string().min(10).max(200).required().messages({
        'string.base': 'La descripción debe ser un texto.',
        'string.empty': 'La descripción es obligatoria.',
        'string.min': 'La descripción debe tener al menos {#limit} caracteres.',
        'string.max': 'La descripción no puede tener más de {#limit} caracteres.',
        'any.required': 'La descripción es un campo obligatorio.'
    })
});

module.exports = validadorRegistro;

// POST - Registrar materia
const registrarMateria = async (req, res) => {
    try {
        const { error } = validadorRegistro.validate(req.body, { abortEarly: false });

        if (error) {
            const mensajesErrores = error.details.map(detail => detail.message).join('|');
            return res.status(400).json({ 
                mensaje: 'Errores en la validación',
                resultado: {
                    id_materia: '',
                    nombre: '',
                    horas_semanales: '',
                    description: '',
                    erroresValidacion: mensajesErrores
                }
            });
        
        }

        const { id_materia, nombre, horas_semanales, descripcion } = req.body;


        const materiaExistente = await Materia.findByPk(id_materia);
        if (materiaExistente) {
          return res.status(400).json({ mensaje: 'La materia ya existe', resultado: null });
        }
        
        const nuevaMateria = await Materia.create({ id_materia, nombre, horas_semanales, descripcion });

        res.status(201).json({
            mensaje: 'Materia registrada con éxito',
            resultado: {
                id_materia: nuevaMateria.id_materia,
                nombre: nuevaMateria.nombre,
                horas_semanales: nuevaMateria.horas_semanales,
                description: nuevaMateria.description
            }
        });
    }catch (error) {
        console.error('Error al registrar la materia:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor', resultado: null });
    }
};

// GET - Listar materias
const listarMateris = async (req, res) => {
    try {
      const materia = await Materia.findAll();
      res.status(200).json({ mensaje: 'Materias listadas', resultado: materia });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

// PUT - Actualizar materia
const actualizarMateria = async (req, res) => {
    try {
      const { id_materia } = req.params;
      const { nombre, horas_semanales, descripcion } = req.body;
  
      const materia = await Materia.findByPk(id_materia);
      if (!materia) {
        return res.status(404).json({ mensaje: 'Materia no encontrado', resultado: null });
      }
  
      await Materia.update({ nombre, horas_semanales, descripcion }, { where: { id_materia } });
      const materiaActualizada = await Materia.findByPk(id_materia);
  
      res.status(200).json({ mensaje: 'Materia actualizada', resultado:  materiaActualizada });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

// DELETE - Eliminar materia
const borrarMateria = async (req, res) => {
  try {
    const { id_materia } = req.params;

    const materia = await Materia.findByPk(id_materia);
    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada', resultado: null });
    }

    await Materia.destroy({ where: { id_materia } });
    res.status(200).json({ mensaje: 'Materia eliminada', resultado: null });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};


module.exports = {
    registrarMateria,
    listarMateris,
    actualizarMateria,
    borrarMateria
};