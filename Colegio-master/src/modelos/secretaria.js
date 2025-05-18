const defineSecretaria = (sequelize, DataTypes) => {
    return sequelize.define('Secretaria', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,   
            unique: 'email'
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'secretaria',
        timestamps: true
    });
};

module.exports = defineSecretaria;