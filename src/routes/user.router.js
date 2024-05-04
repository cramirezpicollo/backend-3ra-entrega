import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import passport from "passport";

const userRouter = Router ();
const userController = new UserController ();

userRouter.post("/register", passport.authenticate("register", {failureRedirect: "/api/users/failedregister"}), userController.register)
userRouter.post("/login",userController.login);
userRouter.get("/profile",userController.profile);
userRouter.post("/logout", userController.logout.bind(userController));
userRouter.get("/admin", passport.authenticate("admin", { session: false }), userController.admin);

export {userRouter};

