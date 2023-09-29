import { Router } from "express"
import { uploader } from "../../utils.js"
import managerProducto from "../dao/mongoosedb/managerMongose/managerProductoMoogose.js"
import mongoose from "mongoose";
import { __dirname } from "../../utils.js"


const router = Router()

const ManagerProducto = new managerProducto()
router.get("/paginate", async (req, res) => {
    try {
        const {limit=10,page=1}=req.query
        const productos = await ManagerProducto.paginateProductos(limit,page)
    // res.render("products", { productos })
    res.json({ productos })
    } catch (error) {
        console.log(error);
    }
})


router.get("/agregation", async (req, res) => {
    try {
        const productosFiltrados= await ManagerProducto.getProductAgregation()
        // res.render("formulario")
        // res.render("home", { productosFiltrados })
         res.json({ productosFiltrados })
    } catch (error) {
        console.log(error);
    }
})



router.get("/", async (req, res) => {
    try {
        const productos = await ManagerProducto.getProduct()
        // res.render("formulario")
        res.render("home", { productos , user:req.session.user })
     
        //  res.json({ productos })
    } catch (error) {
        console.log(error);
    }
})



router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const producto = await ManagerProducto.getProductoById(id)
        res.json({producto})
        // res.render("detalle", { producto })
    } catch (error) {
        console.log(error);
    }

})

function auth(req, res, next) {
    if (req.session.rol === administrador) {
        return next()
    } else {
        return res.status(403).send('Usuario no autorizado para ingresar a este recurso..')
    }
}

//pos para imagen
router.post("/", uploader.single('file') ,async (req, res) => {
    try {
        uploader.single("file")
        if (!req.file) {
            return res.status(400).send({ status: "error", mensaje: "no se adjunto archivo" })
        }
        console.log(req.file)

        const producto = req.body

        const productopaht = req.file.filename

        producto.thumbnails = `/img/${productopaht}`
        console.log(producto.thumbnails);


        const nuevoProducto = await ManagerProducto.addProduct(producto)
        // res.json({ message: "Producto creado", producto: nuevoProducto })
        res.redirect("/api/products")
    } catch (error) {
        console.log(error);
    }

})

router.delete("/", async (req, res) => {
    const message = await ManagerProducto.delateProduct()
    res.json({ message })
})

router.delete("/:idProducto", async (req, res) => {
    try {
        const { idProducto } = req.params
        const message = await ManagerProducto.delateProductById(idProducto)
        res.json({ message })
    } catch (error) {
        console.log(error);
    }

})

router.put("/:idProducto", async (req, res) => {
    try {
        const { idProducto } = req.params
        const productoup = req.body
        // const updateOptions={new:true}
        const producto = await ManagerProducto.upDateProduc(idProducto, productoup)
        res.json({ producto })
    } catch (error) {
        console.log(error);
    }

})





export default router