const express = require('express');
const router = express.Router();

const ProductoController = require('../controllers/producto.controller');

router.get('/', ProductoController.getAllProductos);
router.get('/:id', ProductoController.getProductoById);
router.get('/numSerie/:numSerie', ProductoController.getProductoByNumSerie);
router.post('/', ProductoController.createProducto);

module.exports = router;