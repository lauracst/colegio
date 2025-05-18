const Joi = require('joi');
const { Estudiante } = require('../baseDatos/index');

const validadorRegistro = Joi.object({
  documento: Joi.string().min(8).max(10).required().messages({
    'string.base': 'El documento debe ser un texto.',
    'string.empty': 'El documento es obligatorio.',
    'string.min': 'El documento debe tener al menos {#limit} caracteres.',
    'string.max': 'El documento no puede tener más de {#limit} caracteres.',
    'any.required': 'El documento es un campo obligatorio.'
  }),

  nombre: Joi.string().min(2).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
    'any.required': 'El nombre es un campo obligatorio.'
  }),

  apellido: Joi.string().min(2).max(50).required().messages({
    'string.base': 'El apellido debe ser un texto.',
    'string.empty': 'El apellido es obligatorio.',
    'string.min': 'El apellido debe tener al menos {#limit} caracteres.',
    'string.max': 'El apellido no puede tener más de {#limit} caracteres.',
    'any.required': 'El apellido es un campo obligatorio.'
  }),

  fecha_nacimiento: Joi.date().iso().less('now').required().messages({
    'date.base': 'La fecha de nacimiento debe ser una fecha válida.',
    'date.format': 'La fecha debe tener el formato YYYY-MM-DD.',
    'date.less': 'La fecha de nacimiento no puede ser en el futuro.',
    'any.required': 'La fecha de nacimiento es un campo obligatorio.'
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'El email debe ser un texto.',
    'string.empty': 'El email es obligatorio.',
    'string.email': 'El email debe ser un correo electrónico válido.',
    'any.required': 'El email es un campo obligatorio.'
  }),

  celular: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.base': 'El celular debe ser un texto.',
    'string.empty': 'El celular es obligatorio.',
    'string.pattern.base': 'El celular debe tener exactamente 10 dígitos numéricos.',
    'any.required': 'El celular es un campo obligatorio.'
  })
});

module.exports = validadorRegistro;


// POST - Registrar estudiante
const registrarEstudiante = async (req, res) => {
  try {
    const { error } = validadorRegistro.validate(req.body, { abortEarly: false });

    if (error) {
      const mensajesErrores = error.details.map(detail => detail.message).join('|');
      return res.status(400).json({
        mensaje: 'Errores en la validación',
        resultado: {
          documento: '',
          nombre: '',
          apellido: '',
          fecha_nacimiento: '',
          email: '',
          celular: '',
          erroresValidacion: mensajesErrores
        }
      });
    }

    const { documento, nombre, apellido, fecha_nacimiento,  email, celular } = req.body;

    const estudianteExistente = await Estudiante.findByPk(documento);
    if (estudianteExistente) {
      return res.status(400).json({ mensaje: 'El estudiante ya existe', resultado: null });
    }

    const nuevoEstudiante = await Estudiante.create({ documento, nombre, apellido, fecha_nacimiento,  email, celular });

    res.status(201).json({
      mensaje: 'Estudiante creado',
      resultado: {
        documento: nuevoEstudiante.documento,
        nombre: nuevoEstudiante.nombre,
        apellido: nuevoEstudiante.apellido,
        fecha_nacimiento: nuevoEstudiante.fecha_nacimiento,
        email: nuevoEstudiante.email,
        celular: nuevoEstudiante.celular,
        erroresValidacion: ''
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

// GET - Listar estudiantes
const listarEstudiante = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json({ mensaje: 'Estudiantes listados', resultado: estudiantes });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

// PUT - Actualizar estudiante
const actualizarEstudiante = async (req, res) => {
  try {
    const { documento } = req.params;
    const { email, nombre, celular, apellido } = req.body;

    const estudiante = await Estudiante.findByPk(documento);
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado', resultado: null });
    }

    await Estudiante.update({ email, nombre, celular, apellido }, { where: { documento: documento } });
    const estudianteActualizado = await Estudiante.findByPk(documento);

    res.status(200).json({ mensaje: 'Estudiante actualizado', resultado: estudianteActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

// DELETE - Borrar estudiante
const borrarEstudiante = async (req, res) => {
  try {
    const { documento } = req.params;

    const estudiante = await Estudiante.findByPk(documento);
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado', resultado: null });
    }

    await Estudiante.destroy({ where: { documento: documento } });
    res.status(200).json({ mensaje: 'Estudiante eliminado', resultado: null });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

module.exports = {
  registrarEstudiante,
  listarEstudiante,
  actualizarEstudiante,
  borrarEstudiante
};