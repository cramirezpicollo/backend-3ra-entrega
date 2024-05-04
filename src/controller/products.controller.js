import { ProductManager } from "../services/ProductManager.js";

const ProductService = new ProductManager();

class ProductController {

    async agregarProducto(req, res) {
        const { title, description, price, img, code, stock, status = true, category } = req.body;

        try {
            const response = await ProductService.addProduct({ title, description, price, img, code, stock, status, category })
            res.json(response)

        } catch (error) {
            console.log(error);
            res.send("Error al intentar agregar producto")
        }
    }

    async obtenerProductos(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

            const productos = await ProductService.getProducts({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query,
            });

            res.json({
                status: 'success',
                payload: productos,
                totalPages: productos.totalPages,
                prevPage: productos.prevPage,
                nextPage: productos.nextPage,
                page: productos.page,
                hasPrevPage: productos.hasPrevPage,
                hasNextPage: productos.hasNextPage,
                prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
            });
        } catch (error) {
            console.log(error);
            res.send("Error al intentar recibir el producto")

        }
    }

    async obtenerProductoPorId(req, res) {
        const { pid } = req.params;

        try {
            const products = await ProductService.getProductById(pid)
            if (!products) {
                return res.json({
                    error: "producto no encontrado"
                });

            }
            res.json(products);

        } catch (error) {
            console.log(error);
            res.send("Error al intentar recibir el producto con id")
        }
    }

    async actualizarProducto(req, res) {
        try {

            const { pid } = req.params;
            const { title, description, price, img, code, stock, status = true, category } = req.body;

            const response = await ProductService.updateProduct(pid, { title, description, price, img, code, stock, status, category })
            res.json(response)

        } catch (error) {
            console.log(error);
            res.send("Error al intentar actualizar producto")

        }

    }

    async eliminarProducto(req, res) {

        const { pid } = req.params;

        try {
            await ProductService.deleteProduct(pid)
            res.send("producto eliminado con exito")
        } catch (error) {

            console.log(error);
            res.send("Error al intentar eliminar producto")

        }
    }
}


export { ProductController };