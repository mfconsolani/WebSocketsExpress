"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
exports.productRoutes = express_1.default.Router();
// Get requests
// Listar todos los productos
exports.productRoutes.get('/productos', (req, res) => {
    server_1.instance.displayAll(res);
});
// Listar un producto específico
exports.productRoutes.get('/productos/:id', (req, res) => {
    server_1.instance.displayOne(req, res);
});
// Post requests
// Cargar un nuevo producto
exports.productRoutes.post('/productos/', (req, res) => {
    server_1.instance.saveProduct(req, res);
});
// Put requests
// Reemplzar datos
exports.productRoutes.put('/productos/:id', (req, res) => {
    server_1.instance.replaceData(req, res);
});
// Delete requests
// Elimina un producto
exports.productRoutes.delete('/productos/:id', (req, res) => {
    server_1.instance.deleteItem(req, res);
});
