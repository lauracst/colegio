require('dotenv').config();
const express = require('express');
const app = express(); 
const cors = require('cors');

const estudianteRutas = require('./rutas/estudianteRutas');
const materiaRutas = require('./rutas/materiaRutas');
const profesorRutas = require('./rutas/profesorRutas');
const inscripcionMateriaRutas = require('./rutas/inscripcionMateriaRutas');
const materiaProfesorRutas = require('./rutas/materiaProfesorRutas');
const secretariaRutas = require('./rutas/secretariaRutas');

app.use(express.json());
app.use(cors());

app.use('/api/estudiante', estudianteRutas);
app.use('/api/materia', materiaRutas);
app.use('/api/profesor', profesorRutas);
app.use('/api/inscripcion', inscripcionMateriaRutas);
app.use('/api/materiaprofesor', materiaProfesorRutas);
app.use('/api/secretaria', secretariaRutas);

const PORT = process.env.PORT || 3000;

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});