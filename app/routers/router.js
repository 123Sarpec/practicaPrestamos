let express = require('express');
let router = express.Router();

const prestamos = require('../controllers/controller.js'); // Asegúrate de que el archivo del controlador tenga el nombre correcto

// Rutas para manejar préstamos
router.post('/api/prestamos/create', prestamos.create);
router.get('/api/prestamos/all', prestamos.retrieveAllPrestamos);
router.get('/api/prestamos/onebyid/:id', prestamos.getPrestamoById);
router.put('/api/prestamos/update/:id', prestamos.updateById);
router.delete('/api/prestamos/delete/:id', prestamos.deleteById);

module.exports = router;
