import express from "express"
import { __dirname } from "./utils.js"
import productosRouter from "./src/routers/productos.Router.js"
import viewRouter from "./src/routers/view.router.js"
import cartsRouter from "./src/routers/carts.Router.js"
import loginRouter from "./src/routers/login.Router.js"
import sessionRouter from "./src/routers/session.router.js"
import githubviews from "./src/routers/github.views.Router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import "./src/dao/mongoosedb/dbConfig.js"
import session from "express-session"
import cookieParser from "cookie-parser"
// import  FileStore from "session-file-store"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import passport from "passport"
import initializePassport from "./src/config/passport.config.js"






const app = express()
const URI = "mongodb+srv://ingjesussantiago:1BJqXKhkrqa9kOEM@cluster0.nwy2csb.mongodb.net/8Entregabk?retryWrites=true&w=majority"
// const fileStorage = FileStore(session)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("secreto"))
app.use(session({
    // store:new fileStorage({path:"./sessions",ttl:15, retries:0}),

    store:MongoStore.create({

            mongoUrl:URI,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 10*60
    }),

    secret:"secreto",
    resave:true,
    saveUninitialized:true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/src/views")
app.set("view engine", "handlebars")


app.use(express.static(__dirname + "/src/public"))
app.use("/api/carts", cartsRouter)
app.use("/api/products", productosRouter)
app.use("/api/session",sessionRouter)
app.use("/login",loginRouter)

app.use("/", viewRouter)
app.use("/github",githubviews )





// app.get("/crearcoki",(req,res)=>{
//     res.cookie("cookie4","primera",{maxAge:1000} ).send("prueba de cooki")
// })
// app.get("/crearfirmada",(req,res)=>{
//     res.cookie("cookie1","primera fir",{signed:true}).send("prueba de cooki fir")
// })

// app.get("/leercoki",(req,res)=>{
//     // console.log(req);
//     const {cookies,signedCookies}=req
//     // res.send("leyendo cookis")
//     res.json({message:"cookies",cookies,signedCookies})
// })


// app.get("/borrarcoki",(req,res)=>{
//    res.clearCookie("cookie2").send("borrado")
// })
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("escuchando puerto con htpp y socket io")
})


const socketServer = new Server(httpServer)

socketServer.on("connection", async (Socket) => {
    console.log(`cliente conectado a servidor:${Socket.id}`)
    Socket.on('disconnect', () => {
        console.log(`Un cliente se ha desconectado:${Socket.id}`)
    })

})






