const express = require('express');
const enrutador = express.Router();
const inscripcionMateriaControlador = require('../controladores/inscripcionMateriaControlador');

enrutador.post('/registrar', inscripcionMateriaControlador.registrarInscripcionMateria);
enrutador.get('/listar', inscripcionMateriaControlador.listarInscripcionMateria);
enrutador.put('/actualizar/:id_inscripcion', inscripcionMateriaControlador.actualizarInscipcionMateria);
enrutador.delete('/borrar/:id_inscripcion', inscripcionMateriaControlador.borrarInscripcionMateria);

module.exports = enrutador; 