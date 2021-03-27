import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true }
}, {collection: 'mensajes'})

export const Mensaje = mongoose.model('Mensaje', chatSchema);