const defineInscripcionMaterias = (sequelize, DataTypes) => {
    return sequelize.define('InscripcionMaterias', {
        id_inscripcion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        documento_estudiante: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'estudiante',
                key: 'documento'
            }
        },
        id_materia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'materia',
                key: 'id_materia'
            }
        }
    }, {
        tableName: 'inscripcion_materias',
        timestamps: true
    });
};

module.exports = defineInscripcionMaterias;
