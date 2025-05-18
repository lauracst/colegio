const defineEstudiante = (sequelize, DataTypes) => {
    return sequelize.define('Estudiante', {
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
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
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
        tableName: 'estudiante',
        timestamps: true
    });
};

module.exports = defineEstudiante;
