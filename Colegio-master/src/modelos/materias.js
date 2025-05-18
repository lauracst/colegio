const defineMateria = (Sequelize, DataTypes) => {
    return Sequelize.define('Materia', {
        id_materia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: 'id_materia'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horas_semanales: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1,
                max: 20
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'materia',
        timestamps: true
    });
};

module.exports = defineMateria;
