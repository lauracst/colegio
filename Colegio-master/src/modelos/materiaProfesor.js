const defineMateriaProfesor = (sequelize, DataTypes) => {
    return sequelize.define('MateriaProfesor', {
        id_materia_profesor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        documento_profesor: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'profesor',
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
        },
        fecha_asignacion: {
            type: DataTypes.DATE,
            allowNull: false
          }          
    }, {
        tableName: 'materia_profesor',
        timestamps: false
    });
};

module.exports = defineMateriaProfesor;