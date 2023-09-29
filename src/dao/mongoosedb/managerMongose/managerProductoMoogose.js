import { productoModel } from "../models/producto.model.js"


export default class managerProducto {

    paginateProductos = async (limit,page) => {
        try {
            const productos = await productoModel.paginate({category:"ropa masculina"},{limit,page})
                
            // const products = {
            //     title:productos.docs._id,
            //     price:productos.docs.price,
            // }
            
            
            const info={
                count:productos.totalDocs,
                page:productos.totalPages,
                prev:productos.hasPrevPage ? `http://localhost:8080/api/products/paginate?page=${productos.prevPage}`: null,
                next:productos.hasNextPage ? `http://localhost:8080/api/products/paginate?page=${productos.nextPage}`: null
            }
          
            return {productos:productos.docs,info}
            
        } catch (error) {
            console.log(error);
        }
    }

    getProduct = async () => {
        try {
            const productos = await productoModel.find().lean()
            return productos
        } catch (error) {
            console.log(error);
        }
    }


    getProductAgregation = async () => {
        try {
            const productosFiltrados = await productoModel.aggregate([
{
   $match:{price:{$gt:300}}, 

},
// {   $count:"cantidad"}

            ])
            return productosFiltrados
        } catch (error) {
            console.log(error);
        }
    }



    getProductoById = async (_id) => {
        try {
            const producto = await productoModel.findById(_id).lean()
            //  console.log("desdemanager",producto);
            return producto

        } catch (error) {
            console.log(error);
        }
    }


    addProduct = async (producto) => {
        try {
            const nuevoProducto = await productoModel.create(producto)
            return nuevoProducto

        } catch (error) {

            console.log(error);
        }
    }

    delateProduct = async () => {
        try {
            const eliminaAllObjetos = await productoModel.deleteMany({})
            return eliminaAllObjetos

        } catch (error) {
            console.log(error);
        }
    }


    delateProductById = async (idProducto) => {
        try {
            const idProductoBorrado = await productoModel.findByIdAndDelete(idProducto)
            return idProductoBorrado
        } catch (error) {
            console.log(error)
        }

    }

    upDateProduc = async (idProducto, productoup) => {
        try {
            const updateOptions = { new: true }
            const modificaProdcto = await productoModel.findByIdAndUpdate(idProducto, productoup, updateOptions)
            return modificaProdcto
        } catch (error) {
            console.log(error);
        }
    }






}


