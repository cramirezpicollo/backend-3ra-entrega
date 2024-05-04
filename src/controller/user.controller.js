import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import passport from "passport";


class UserController {

    async register(req, res) {
        const { first_name, last_name, email, password, age } = req.body;

        try {
            const usuarioExistente = await UserModel.findOne({ email: email });
            if (usuarioExistente) {
                return res.status(400).send(" correo electronico registrado");
            }

            const nuevoUsuario = await UserModel.create({ first_name, last_name, email, password: createHash(password), age });

            req.session.login = true;
            req.session.user = { ...nuevoUsuario._doc }
            res.redirect("/profile");

        } catch (error) {
            res.status(500).send("Error interno del servidor")
        }

    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const usuario = await UserModel.findOne({ email: email });
            if (usuario) {
                if (isValidPassword(password, usuario)) {
                    req.session.login = true;
                    req.session.user = {
                        email: usuario.email,
                        age: usuario.age,
                        first_name: usuario.first_name,
                        last_name: usuario.last_name
                    }
                    res.redirect("/products");

                } else {
                    res.status(401).send("contraseña inválida");
                }

            } else {
                res.status(404).send("usuario no encontrado");
            }

        } catch (error) {
            res.status(500).send("error interno del servidor")
        }

    }

    async logout(req, res) {
        if (req.session.login) {
            req.session.destroy();

        }

        res.redirect("/login");

    }

    async profile(req, res) {
        
        const isUser = req.session.user = {
            email: usuario.email,
            age: usuario.age,
            first_name: usuario.first_name,
            last_name: usuario.last_name
            }

        const isAdmin = req.user.role === 'admin';

        res.render("profile", { user: isUser, isAdmin });
    }

    async admin(req, res) {
        if (req.user.user.role !== "admin") {
            return res.status(403).send("Acceso denegado");
        }
        res.render("admin");
    }



}

export {UserController};



//REGISTER

//sessionsRouter.post("/", passport.authenticate("register", {
//    failureRedirect: "/api/sessions/failedregister"
//}), async (req, res) => {

//    if (!req.user) return res.status(400).send("credenciales invalidas");
//
//    req.session.user = {
//        first_name: req.user.first_name,
//        last_name: req.user.last_name,
//        age: req.user.age,
//        email: req.user.email
//
//    };
//
//    req.session.login = true;

//    res.redirect("/profile");
//
//})

//sessionsRouter.get("/failedregister", (req, res) => {
//    res.send("registro fallido");
//
//})

//LOGIN

//sessionsRouter.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }),
//    async (req, res) => {
//        if (!req.user) return res.status(400).send("credenciales invalidas");
//
//        req.session.user = {
//            first_name: req.user.first_name,
//            last_name: req.user.last_name,
//            age: req.user.age,
//            email: req.user.email,
//            rol: req.user.rol
//        };
//
//        req.session.login = true;
//
//        res.redirect("/products");
//
//    })
//
//sessionsRouter.get("/faillogin", async (req, res) => {
//    res.send("falló algun dato en el login");
//
//})
//

//ADMIN

//sessionsRouter.get("/admin", passport.authenticate("admin", { session: false }),
//    async (req, res) => {
//
//        if (req.user.rol !== "admin") {
//            return res.status(403).send("error de autorización. Acceso denegado");
//        };
//
//        res.render("admin");
//
//    })
//

//LOGOUT

//sessionsRouter.get("/logout", (req, res) => {
//    if (req.session.login) {
//        req.session.destroy();
//
//    }

//    res.redirect("/login");
//
//})
//
//
//LOGIN GITHUB
//
//sessionsRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })
//
//sessionsRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
//
//    req.session.user = req.user;
//    req.session.login = true;
//    res.redirect("/profile");
//
//})
//
//