import { Router } from "express";
import { __dirname } from "../../utils.js"
const router =Router()


router.post("/prueba", async (req, res) => {
    try {
        const {nombre,contrasena}=req.body
        console.log(nombre,contrasena);
        req.session["nombre"]=nombre
        req.session["contrasena"]=contrasena
        


        console.log(req);
        res.send(`bienvenido ${nombre}`)
    } catch (error) {
        console.log(error);
    }
})




export default router