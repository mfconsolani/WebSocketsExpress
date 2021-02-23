"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const express_1 = __importDefault(require("express"));
const productRoutes_1 = require("./productRoutes");
const viewsRoutes_1 = require("./viewsRoutes");
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const handlerClass_1 = __importDefault(require("./handlerClass"));
// Global variables
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8080;
let productos = [];
exports.instance = new handlerClass_1.default([]);
// Middleware
app.engine('hbs', express_handlebars_1.default({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path_1.default.join(__dirname, '../views/layouts'),
    partialsDir: path_1.default.join(__dirname, '../views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Server Port config
const server = http.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('ingreso', productos);
    socket.on('producto cargado', (data) => {
        io.emit('nuevo producto', data);
        productos.push(data);
    });
});
server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`);
});
// Router
app.use('/api', productRoutes_1.productRoutes);
app.use('/', viewsRoutes_1.viewsRoutes);
