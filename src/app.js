import express from "express";
import ExpressHandlebars from "express-handlebars";
import { Server } from "socket.io";

import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { userRouter } from "./routes/user.router.js";
import { viewRouter } from "./routes/views.router.js";
import "./database.js"
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";


const PORT = 8080;

const app = express();

//Configuro Express HB
app.engine("handlebars", ExpressHandlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.static("./src/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//Middleware Session
app.use (session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create ({
        mongoUrl: "mongodb+srv://cramirezpicollo:walenten1.@cluster0.i0f05yt.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0"

    })

}))

//Passport
initializePassport ();
app.use (passport.initialize());
app.use (passport.session());

//Rutas
app.use("/", viewRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/users", userRouter)


const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
