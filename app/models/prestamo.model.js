module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamo', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        numeroPedido: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        codigoLibro: {
            type: Sequelize.STRING,
        },
        codigoUsuario: {
            type: Sequelize.STRING,
        },
        fechaSalida: {
            type: Sequelize.DATE,
        },
        fechaMaxima: {
            type: Sequelize.DATE,
        },
        fechaDevolucion: {
            type: Sequelize.DATE
        },
        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'API Prestamos'
        }
    });

    return Prestamo;
}
