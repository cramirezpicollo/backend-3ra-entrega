import { Router } from "express";
import { CartController } from "../controller/carts.controller.js";

const cartController =  new CartController();
const cartsRouter = Router ();

cartsRouter.post("/", cartController.nuevoCarrito);
cartsRouter.get("/:cid", cartController.obtenerCarrito);
cartsRouter.post("/:cid/product/:pid", cartController.agregarProductoEnCarrito);
cartsRouter.delete('/:cid/product/:pid', cartController.eliminarDelCarrito);
cartsRouter.put('/:cid', cartController.actualizarProductosEnCarrito);
cartsRouter.put('/:cid/product/:pid', cartController.actualizarCantidad);
cartsRouter.delete('/:cid', cartController.vaciarElCarrito);


export {cartsRouter};
