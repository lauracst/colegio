require('dotenv').config();

const { Sequelize,DataTypes } = require('sequelize');

const defineEstudiante = require('../modelos/estudiantes');
const defineMateria = require('../modelos/materias');
const defineProfesor = require('../modelos/profesor');
const defineInscripcionMaterias = require('../modelos/inscripcionMateria');
const defineMateriaProfesor = require('../modelos/materiaProfesor');
const defineSecretaria = require('../modelos/secretaria');


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const Estudiante = defineEstudiante(sequelize, DataTypes);
const Materia = defineMateria(sequelize, DataTypes);
const Profesor = defineProfesor(sequelize, DataTypes);
const InscripcionMateria = defineInscripcionMaterias(sequelize, DataTypes);
const MateriaProfesor = defineMateriaProfesor(sequelize, DataTypes);
const Secretaria = defineSecretaria(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error en la sincronización:', err));

module.exports = {
    Estudiante,
    Materia,
    Profesor,
    InscripcionMateria,
    MateriaProfesor,
    Secretaria, 
    sequelize
};