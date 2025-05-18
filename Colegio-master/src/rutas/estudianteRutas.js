const express = require('express');
const  enrutador = express.Router();
const estudianteControlador = require('../controladores/estudianteControlador');

enrutador.post('/registrar', estudianteControlador.registrarEstudiante);
enrutador.get('/listar', estudianteControlador.listarEstudiante);
enrutador.put('/actualizar/:documento', estudianteControlador.actualizarEstudiante);
enrutador.delete('/borrar/:documento', estudianteControlador.borrarEstudiante);

module.exports = enrutador;