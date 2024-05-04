import { Router } from "express";
import { ProductController } from "../controller/products.controller.js";

const productsRouter = Router();
const productController = new ProductController ();

productsRouter.get("/", productController.obtenerProductos);
productsRouter.get("/:pid", productController.obtenerProductoPorId);
productsRouter.post("/", productController.agregarProducto);
productsRouter.put("/:pid", productController.actualizarProducto);
productsRouter.delete("/:pid", productController.eliminarProducto);

export {productsRouter}