import { cartModel } from "../models/cart.model.js";

export default class ManagerCart {

    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean().populate("products._id")
            return carts

        } catch (error) {
            console.error('Error al traer los carritos:', err.message);
            return [];
        }

    }


    getCart = async (cartId) => {
        try {
            
            const cart = await cartModel.findById(cartId).lean().populate("products._id")
            return cart;
        } catch (err) {
            console.error('Error al traer el carrito por ID:', err.message);
            return err;
        }
    };

    crearCarrito = async (productos) => {
        try {
            let cartData = {};
            if (productos && productos.length > 0) {
                cartData.productos = productos;
            }

            const cart = await cartModel.create(cartData);
            return cart;
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;

        }
    };

    delatecarrito = async (cartId) => {
        try {
            const delatecart = await cartModel.findByIdAndDelete(cartId).lean()
            return delatecart;
        } catch (error) {
            console.log(error);
        }
    }


    // addProductoCart = async (cartId, obj) => {
    //  try {
    //         const filter = { _id: cartId, "products._id": obj._id };
    //         const cart = await cartModel.findById(cartId);
    //         const findProduct = cart.products.some((product) => product._id.toString() === obj._id);
    
    //         if (findProduct) {
    //             const update = { $inc: { "products.$.quantity": obj.quantity } };
    //             await cartModel.updateOne(filter, update);
    //         } else {
    //             const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
    //             await cartModel.updateOne({ _id: cartId }, update);
    //         }
    
    //         return await cartModel.findById(cartId);
    //     } catch (err) {
    //         console.error('Error al agregar el producto al carrito:', err.message);
    //         return err;
    //     }
    // };



    addProductoCarts = async (idCart, idProducto) => {
        try {
            const filter = { _id: idCart, "products._id": idProducto._id };
            const cart = await cartModel.findById(idCart);
            const findProduct = cart.products.some((product) => product._id.toString() === idProducto._id);

            if (findProduct) {
                const update = { $inc: { "products.$.quantity": idProducto.quantity } };
                await cartModel.updateOne(filter, update);
            } else {
                const update = { $push: { products: { _id: idProducto._id, quantity: idProducto.quantity } } };
                await cartModel.updateOne({ _id: idCart }, update);
            }

            return await cartModel.findById(idCart).lean()
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err.message);
            return err;
        }

    }

    updateOneProduct = async (cid, products) => {
        
        await cartModel.updateOne(
            { _id: cid },
            {products})
        return await cartModel.findOne({ _id: cid })
    }

    deleteProductInCart = async (cid, products) => {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { products },
                { new: true })

        } catch (err) {
            return err
        }

    }




}