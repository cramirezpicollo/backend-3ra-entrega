const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

//importamos modulador de errores
const CustomError = require ("../services/errors/custom.js")
const generarInfoError = require ("../services/errors/info.js")
const EErrors = require ("../services/errors/enum.js")


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile);
router.post("/logout", userController.logout.bind(userController));
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin);


//ruta modulador de errores

router.post("/register", async (req,res, next)=>{
    const {first_name, last_name, email} = req.body;
    try {
        if (!first_name || !last_name || !email){
            throw CustomError.crearError ({
                nombre: "Usuario nuevo",
                causa: generarInfoError ({first_name, last_name, email}),
                mensaje: "Error al intentar crear usuario",
                codigo: EErrors.TIPO_INVALIDO

            });
        }


    } catch (error){
        next (error);

    }
})


module.exports = router;

