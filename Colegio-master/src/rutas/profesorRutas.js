const express = require('express');
const enrutador = express.Router();

const profesorControlador = require('../controladores/profesoresControlador');


enrutador.post('/registrar', profesorControlador.registrarProfesor);
enrutador.get('/listar', profesorControlador.listarProfesor);
enrutador.put('/actualizar/:documento', profesorControlador.actualizarProfesor);
enrutador.delete('/borrar/:documento', profesorControlador.borrarProfesor);

module.exports = enrutador;