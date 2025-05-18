const express = require('express');
const enrutador = express.Router();

const materiaControlador = require('../controladores/materiaControlador');

enrutador.post('/registrar', materiaControlador.registrarMateria);
enrutador.get('/listar', materiaControlador.listarMateris);
enrutador.put('/actualizar/:id_materia', materiaControlador.actualizarMateria);
enrutador.delete('/borrar/:id_materia', materiaControlador.borrarMateria);

module.exports = enrutador;