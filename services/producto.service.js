const ProductoRepository = require('../repositories/producto.repository');
const validacion = require('../utils/validation');

class ProductoService{

    async getAllProductos(){
        return await ProductoRepository.getAllProductos();
    }

    async getProductoById(id){
        return await ProductoRepository.getProductoById(id);
    }
    
    async getProductoByNumSerie(numSerie){
        return await ProductoRepository.getProductoByNumSerie(numSerie);
    }

    async createProducto(producto){
        if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie) {
            throw new Error("Todos los campos son requeridos");
        }
        const prodeuctoByNumSerie = await ProductoRepository.getProductoByNumSerie(producto.numSerie);
        if (prodeuctoByNumSerie) {
            throw new Error("Ya existe un producto con ese número de serie");
        }
        if (producto.precio < 1) {
            throw new Error("El precio no puede ser negativo");
        }
        if (!validacion.esFechaValida(producto.fechaAdquisicion)) {
            throw new Error("La fecha no es válida");
        }
        
        const yearAdquisicion = producto.fechaAdquisicion.split('-')[0];

        let countProductByYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);

        countProductByYear++;

        producto.numInventario = `${yearAdquisicion}-${countProductByYear.toString().padStart(3, '0')}`;

        return await ProductoRepository.createProducto(producto);
    }
}

module.exports = new ProductoService();