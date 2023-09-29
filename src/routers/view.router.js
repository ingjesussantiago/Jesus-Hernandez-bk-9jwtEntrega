import { Router} from "express"
import  managerProducto from "../dao/mongoosedb/managerMongose/managerProductoMoogose.js"
import { __dirname } from "../../utils.js"
import session from "express-session"


const router = Router()

const ManagerProducto = new managerProducto()

router.get("/home", async (req, res) => {
    try {
        const productos = await ManagerProducto.getProduct()
    res.render("home",{ productos })
    // res.json({ productos })
    } catch (error) {
        console.log(error);
    }
    
})

router.get("/realTimeProductos", (req, res) => {
    res.render("realTimeProducts")
})

router.get("/formulario",(req,res)=>{
    res.render("formularioProducto")
})

router.get("/formularioIo",(req,res)=>{
    res.render("formularioProductoIo")
})

// vista de sesiones,registro, profile

router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/registro",(req,res)=>{
    res.render("registro")
})
router.get("/profile",(req,res)=>{
    res.render("profile")
})
router.get("/user", async (req, res) => {
    res.render("profile",{user:req.session.user})
    })









// router.get("/session", (req, res) => {
//   });


// router.get('/login', (req, res) => {
//     const {username, password} = req.query;
//     if (username !== 'pepe' || password !== 'pepepass'){
//         return res.status(401).send("Login Failed, check your username and password.");
//     } else {
//         req.session.user = username;
//         req.session.admin = true;
//         res.send('Login Successful !');
//     }
// });

// router.get("/logout", (req, res) => {
//     req.session.destroy(error => {
//         if (error){
//             res.json({error: "error logout", mensaje: "Error al cerrar la sesion"});
//         }
//         res.send("Sesion cerrada correctamente.");
//     });
// });

// function auth(req, res, next){
//     if (req.session.user === 'pepe' && req.session.admin) {
//         return next();
//     } else{
//         return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
//     }
    
// }

// router.get('/private', auth, (req, res) =>{
//     res.send("Si estas viendo esto es porque pasaste la autorización a este recurso!");
// });





export default router