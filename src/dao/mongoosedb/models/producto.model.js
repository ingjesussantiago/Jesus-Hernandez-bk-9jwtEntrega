import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

const productoSchema = new mongoose.Schema({
      
    title:{
        type:String
    },
    descripcion:{
        type:String
    },
    code:{
        type:Number
    },
    price:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    },
    category:{
        type:String
    },
    stock:{
        type:String
    },
    thumbnails:{
        type:String
    }

});

productoSchema.plugin(paginate)

export const productoModel =mongoose.model("productos",productoSchema)