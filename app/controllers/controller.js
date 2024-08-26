const moment = require('moment'); // Asegúrate de tener moment instalado
const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
    let prestamo = {};

    try {
        // Construir el objeto Prestamo desde el cuerpo de la solicitud
        prestamo.numeroPedido = req.body.numeroPedido;
        prestamo.codigoLibro = req.body.codigoLibro;
        prestamo.codigoUsuario = req.body.codigoUsuario;

        // Asegurarse de que las fechas estén en el formato correcto
        prestamo.fechaSalida = req.body.fechaSalida ? moment(req.body.fechaSalida).format('YYYY-MM-DD HH:mm:ss') : null;
        prestamo.fechaMaxima = req.body.fechaMaxima ? moment(req.body.fechaMaxima).format('YYYY-MM-DD HH:mm:ss') : null;
        prestamo.fechaDevolucion = req.body.fechaDevolucion ? moment(req.body.fechaDevolucion).format('YYYY-MM-DD HH:mm:ss') : null;

        // Guardar en la base de datos MySQL
        Prestamo.create(prestamo).then(result => {    
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Préstamo creado exitosamente con id = " + result.id,
                prestamo: result,
            });
        }).catch(error => {
            res.status(500).json({
                message: "Error al crear el préstamo",
                error: error.message
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el préstamo",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamos = (req, res) => {
    // Obtener toda la información de los préstamos
    Prestamo.findAll()
        .then(prestamos => {
            res.status(200).json({
                message: "Lista de Préstamos obtenidos exitosamente",
                prestamos: prestamos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los préstamos",
                error: error
            });
        });
}

exports.getPrestamoById = (req, res) => {
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            if (!prestamo) {
                res.status(404).json({
                    message: "No se encontró el préstamo con id = " + prestamoId,
                    prestamo: "",
                    error: "404"
                });
            } else {
                res.status(200).json({
                    message: "préstamo  Encotrado con id = " + prestamoId,
                    prestamo: prestamo
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el préstamo",
                error: error
            });
        });
}



exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el préstamo con id = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            // Actualizar el préstamo
            let updatedObject = {
                numeroPedido: req.body.numeroPedido,
                codigoLibro: req.body.codigoLibro,
                codigoUsuario: req.body.codigoUsuario,
                fechaSalida: req.body.fechaSalida ? moment(req.body.fechaSalida).format('YYYY-MM-DD HH:mm:ss') : null,
                fechaMaxima: req.body.fechaMaxima ? moment(req.body.fechaMaxima).format('YYYY-MM-DD HH:mm:ss') : null,
                fechaDevolucion: req.body.fechaDevolucion ? moment(req.body.fechaDevolucion).format('YYYY-MM-DD HH:mm:ss') : null
            };
            let result = await Prestamo.update(updatedObject, { returning: true, where: { id: prestamoId } });

            if (!result[0]) {
                res.status(500).json({
                    message: " No se actulizo el préstamo = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: " No se pudo actualizar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No existe el préstamo con id = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "prestamo elminado con exitos  = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se pudo eliminar el préstamo = " + req.params.id,
            error: error.message,
        });
    }
}
