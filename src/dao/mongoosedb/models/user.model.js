import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true
    },
    edad: Number,
    rol:String,
    password: String,
    loggedBy:String
})

const userModel = mongoose.model(collection, schema);

export default userModel;