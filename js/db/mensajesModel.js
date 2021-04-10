"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mensaje = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
}, { collection: 'mensajes' });
exports.Mensaje = mongoose_1.default.model('Mensaje', chatSchema);
