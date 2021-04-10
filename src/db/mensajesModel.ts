import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema({
    id: { type: String, required: true },
    author: {
        email: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true },
    date: { type: String, required: true }
}, {collection: 'mensajes'})

export const Mensaje = mongoose.model('Mensaje', chatSchema);