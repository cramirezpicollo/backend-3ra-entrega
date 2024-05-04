import { ProductManager } from "../services/ProductManager.js";
import { CartManager } from "../services/cartManager.js";

const ProductService = new ProductManager();
const CartService = new CartManager();


class ViewController {

    async renderProducts(req, res) {

        try {
            const { page = 1, limit = 2 } = req.query;

            const productos = await ProductService.getProducts({
                page: parseInt(page),
                limit: parseInt(limit)
            });

            const nuevoArray = productos.docs.map(producto => {
                const { _id, ...rest } = producto.toObject();
                return rest;
            });

            const cartId = req.user.cart.toString();

            res.render("products", {
                productos: nuevoArray,
                hasPrevPage: productos.hasPrevPage,
                hasNextPage: productos.hasNextPage,
                prevPage: productos.prevPage,
                nextPage: productos.nextPage,
                currentPage: productos.page,
                totalPages: productos.totalPages,
                cartId
            });

        } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({
                status: 'error',
                error: "Error interno del servidor"
            });
        }

    }

    async renderCart(req, res) {
        const cart_id = req.params.cid;

        try {
            const carrito = await CartService.getCartProducts(cart_id);

            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return res.status(404).json({ error: "Carrito no encontrado" });
            }

            const productosEnCarrito = carrito.products.map(item => ({
                product: item.product.toObject(),
                quantity: item.quantity

            }));

            res.render("carts", { productos: productosEnCarrito });

        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    }

    async renderRegister(req, res) {
        if (req.session.login) {
            return res.redirect("/profile");
        }
        res.render("register");

    }

    async renderLogin(req, res) {
        res.render("login");

    }

    async renderProfile(req, res) {
        if (!req.session.login) {
            return res.redirect("/login");
        }

        res.render("profile", { user: req.session.user });

    }
}


export { ViewController };