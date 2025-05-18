const Joi = require('joi');
const { Secretaria } = require('../baseDatos/index');

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
  }),

    contrasena: Joi.string().min(6).max(20).required().messages({
        'string.base': 'La contraseña debe ser un texto.',
        'string.empty': 'La contraseña es obligatoria.',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
        'string.max': 'La contraseña no puede tener más de {#limit} caracteres.',
        'any.required': 'La contraseña es un campo obligatorio.'
    })
});


// POST - Registrar secretaria
const registrarSecretaria = async (req, res) => {
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
            email: '',
            celular: '',
            contrasena: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { documento, nombre, apellido, email, celular, contrasena } = req.body;
  
      const secretariaExistente = await Secretaria.findByPk(documento);
      if (secretariaExistente) {
        return res.status(400).json({ mensaje: 'La secretaria ya existe', resultado: null });
      }
  
      const nuevoSecretaria = await Secretaria.create({ documento, nombre, apellido, email, celular, contrasena });
  
      res.status(201).json({
        mensaje: 'Estudiante creado',
        resultado: {
          documento: nuevoSecretaria.documento,
          nombre: nuevoSecretaria.nombre,
          apellido: nuevoSecretaria.apellido,
          email: nuevoSecretaria.email,
          celular: nuevoSecretaria.celular,
          contrasena: nuevoSecretaria.contrasena,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };

  // Login de secretaria
const loginSecretaria = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Buscar por email
    const secretaria = await Secretaria.findOne({ where: { email } });

    // Si no existe
    if (!secretaria) {
      return res.status(401).json({ mensaje: 'Correo no encontrado' });
    }

    // Comparar contraseña (sin encriptar)
    if (secretaria.contrasena !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Si es correcto
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      secretaria: {
        documento: secretaria.documento,
        nombre: secretaria.nombre,
        apellido: secretaria.apellido,
        email: secretaria.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error en el servidor',
      error: error.message
    });
  }
};

module.exports = validadorRegistro;

module.exports = {
  registrarSecretaria,
  loginSecretaria

};
