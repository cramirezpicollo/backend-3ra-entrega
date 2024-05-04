import { Router } from "express";
import { ViewController } from "../controller/views.controller.js";
import passport from "passport";

const viewRouter = Router ();
const viewsController = new ViewController ();

viewRouter.get("/products", viewsController.renderProducts);

viewRouter.get("/carts/:cid", viewsController.renderCart);
viewRouter.get("/login", viewsController.renderLogin);
viewRouter.get("/register", viewsController.renderRegister);
viewRouter.get("/", viewsController.renderProfile);

export {viewRouter};