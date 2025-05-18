const defineProfesor = (sequelize, DataTypes) => {
    return sequelize.define('Profesor', {
        documento: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: 'documento'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profesion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,   
            unique: 'email'
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: 'profesor',
        timestamps: true
    });
}

module.exports = defineProfesor;