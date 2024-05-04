import { CartManager } from "../services/cartManager.js";

const CartService = new CartManager();

class CartController {

    async nuevoCarrito(req, res) {
        try {
            const response = await CartService.newCart()
            res.json(response)

        } catch (error) {
            console.log("error al crear carrito")
            res.send("Error al crear carrito")
        }
    }

    async obtenerCarrito(req, res) {
        const cartId = req.params.cid;

        try {
            const carrito = await CartService.findById(cartId)

            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return res.status(404).json({ error: "Carrito no encontrado" });
            }

            return res.json(carrito.products);

        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    }

    async agregarProductoEnCarrito(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;

        try {
            const actualizarCarrito = CartService.addProductsToCart(cartId, productId, quantity);
            res.json(actualizarCarrito.products);

        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    }

    async eliminarDelCarrito(req, res) {
        const cart_id = req.params.cid;
        const product_id = req.params.pid;

        try {
            const updatedCart = await CartService.eliminarProductoDelCarrito(cart_id, product_id);

            res.json({
                status: 'success',
                message: 'Producto eliminado del carrito correctamente',
                updatedCart,
            });

        } catch (error) {
            console.error('Error al eliminar el producto del carrito', error);
            res.status(500).json({
                status: 'error',
                error: 'Error interno del servidor',
            });
        }

    }

    async actualizarProductosEnCarrito(req, res) {
        const cart_id = req.params.cid;
        const updatedProducts = req.body;
        try {
            const updatedCart = await CartService.actualizarCarrito(cart_id, updatedProducts);
            res.json(updatedCart);
        } catch (error) {
            console.error('Error al actualizar el carrito', error);
            res.status(500).json({
                status: 'error',
                error: 'Error interno del servidor',
            });
        }
    }

    async actualizarCantidad(req, res) {
        const cart_id = req.params.cid;
        const product_id = req.params.pid;
        const newQuantity = req.body.quantity;

        try {
            const updatedCart = await CartService.actualizarCantidadDeProducto(cart_id, product_id, newQuantity);

            res.json({
                status: 'success',
                message: 'Cantidad del producto actualizada correctamente',
                updatedCart,
            });

        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito', error);
            res.status(500).json({
                status: 'error',
                error: 'Error interno del servidor',
            });
        }

    }

    async vaciarElCarrito(req, res) {
        const cart_id = req.params.cid;

        try {
            const updatedCart = await CartService.vaciarCarrito(cart_id);

            res.json({
                status: 'success',
                message: 'Todos los productos del carrito fueron eliminados correctamente',
                updatedCart,
            });

        } catch (error) {
            console.error('Error al vaciar el carrito', error);
            res.status(500).json({
                status: 'error',
                error: 'Error interno del servidor',
            });
        }

    }
}

export { CartController };