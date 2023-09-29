import  mongoose  from "mongoose"

// const URI = "mongodb+srv://ingjesussantiago:1BJqXKhkrqa9kOEM@cluster0.nwy2csb.mongodb.net/7Entregabk?retryWrites=true&w=majority"
const URI = "mongodb+srv://ingjesussantiago:1BJqXKhkrqa9kOEM@cluster0.nwy2csb.mongodb.net/8Entregabk?retryWrites=true&w=majority"

mongoose.connect(URI,{ useNewUrlParser: true,
    useUnifiedTopology: true})
   
.then(()=>console.log("conectado a db"))
.catch((error)=>console.log(error))
