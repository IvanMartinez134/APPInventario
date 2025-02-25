const ProductoService = require('../services/producto.service');

class ProductoController{

    async getAllProductos(req, res){
         try {
            const productos = await ProductoService.getAllProductos();
            res.status(200).json(productos);
         } catch (error) {
            res.status(500).json({message: error.message});
         }
    }

    async getProductoById(req, res){
         try {
               const { id } = req.params;
               const producto = await ProductoService.getProductoById(id);
               res.status(200).json(producto);
         } catch (error) {
               res.status(500).json({message: error.message});
         }
      }

      async getProductoByNumSerie(req, res){
         try {
               const { numSerie } = req.params;
               const producto = await ProductoService.getProductoByNumSerie(numSerie);
               res.status(200).json(producto);
         } catch (error) {
               res.status(500).json({message: error.message});
         }
      }

      async createProducto(req, res){
         try {
               const producto = req.body;
               const newProducto = await ProductoService.createProducto(producto);
               res.status(201).json(newProducto);
         } catch (error) {
               res.status(500).json({message: error.message});
         }
      }
}

module.exports = new ProductoController();