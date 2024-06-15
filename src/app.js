const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");


//importo Logger
const addLogger= require ("./utils/logger.js")

//importo mock y manejador errores
const mockingProductsRouter = require ("./routes/mockingproducts.js");
const manejadorError = require ("./middleware/error.js")


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//Middleware para Manejo de Errores
app.use("/register", userRouter);
app.use (manejadorError);

//Middleware Logger
app.use(addLogger);


//Rutas logger
app.get ("/loggerTest", (req,res)=>{
    req.logger.debug ("Debug");
    req.logger.http ("http");
    req.logger.info ("info");
    req.logger.warn ("warning");
    req.logger.error ("error");

    res.send ("Logs generados");
})

//Passport 
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

//Ruta Faker
app.use("/api",mockingProductsRouter);


const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);