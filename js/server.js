"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const menasjesModel_1 = require("./menasjesModel");
const mongoose_1 = __importDefault(require("mongoose"));
// Global variables
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8080;
let productos = [];
exports.instance = new handlerClass_1.default([]);
let chatMessages = [];
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
// Mongoose
CRUD();
function CRUD() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const URL = 'mongodb://localhost:27017/ecommerce';
            let response = yield mongoose_1.default.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            console.log('Conectado a MongoDB');
        }
        catch (e) {
            console.log(e);
        }
    });
}
// Server Port config
const server = http.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.on('disconnect', () => {
        if (io.engine.clientsCount === 0) {
            console.log(chatMessages);
            chatMessages.forEach((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
                let saveMessages = new menasjesModel_1.Mensaje(mensaje);
                yield saveMessages.save();
            }));
            chatMessages = [];
        }
    });
    socket.emit('ingreso', { productos, chatMessages });
    socket.on('producto cargado', (data) => {
        io.emit('nuevo producto', data);
        productos.push(data);
    });
    socket.on('new message', (payload) => {
        chatMessages.push(payload);
        io.emit('chat', chatMessages);
    });
});
server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`);
});
// Router
app.use('/api', productRoutes_1.productRoutes);
app.use('/', viewsRoutes_1.viewsRoutes);
