"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const handlerClass_1 = __importDefault(require("./handlerClass"));
exports.productRoutes = express_1.default.Router();
let instance = new handlerClass_1.default([]);
// Get requests
// Listar todos los productos
exports.productRoutes.get('/productos', (req, res) => {
    instance.displayAll(res);
});
//  Renderiza productos en UI
exports.productRoutes.get('/productos/vista', (req, res) => {
    instance.renderApp(req, res);
});
// Listar un producto específico
exports.productRoutes.get('/productos/:id', (req, res) => {
    instance.displayOne(req, res);
});
// Post requests
// Cargar un nuevo producto
exports.productRoutes.post('/productos/', (req, res) => {
    instance.saveProduct(req, res);
});
// Put requests
// Reemplzar datos
exports.productRoutes.put('/productos/:id', (req, res) => {
    instance.replaceData(req, res);
});
// Delete requests
// Elimina un producto
exports.productRoutes.delete('/productos/:id', (req, res) => {
    instance.deleteItem(req, res);
});
