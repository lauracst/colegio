const express = require('express');
const enrutador = express.Router();
const materiaProfesor = require('../controladores/materiaProfesorControlador');

enrutador.post('/registrar', materiaProfesor.registrarMateriaProfesor);
enrutador.get('/listar', materiaProfesor.listarMateriaProdeor);
enrutador.put('/actualizar/:id_materia_profesor', materiaProfesor.actualizarMateriaProfesor);
enrutador.delete('/borrar/:id_materia_profesor', materiaProfesor.borrarMateriaProfesor);

module.exports = enrutador;