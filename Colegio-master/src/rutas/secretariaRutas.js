const express = require('express');
const  enrutador = express.Router();
const secretariaControlador = require('../controladores/secretariaControlador');

enrutador.post('/registrar', secretariaControlador.registrarSecretaria);
enrutador.post('/login', secretariaControlador.loginSecretaria);

module.exports = enrutador;