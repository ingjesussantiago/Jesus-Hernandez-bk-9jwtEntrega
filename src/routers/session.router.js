import { Router } from "express";
import userModel from "../dao/mongoosedb/models/user.model.js"
import passport from "passport";//11


const router = Router()
//12
router.post("/registro", passport.authenticate('registro', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." })

})



router.post("/login", passport.authenticate("login", { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);

    if (!user) return res.status(401).send({ status: "error", error: "credenciales incorrectas" });
    req.session.user = {
        nombre: `${user.nombre} ${user.apellido}`,
        email: user.email,
        edad: user.edad
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
        console.log("paso todo");
    })


})

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});


router.get("/github", passport.authenticate('github', {
    scope: ['user:email']
}), async (req, res) => { });


router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }),
    async (req, res) => {
        const user = req.user;
        req.session.user = {
            nombre: `${user.nombre} ${user.apellido}`,
            email: user.email,
            edad: user.edad
        };
        req.session.admin = true;
        res.redirect("/user");
    });





export default router

