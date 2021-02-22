"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("./products");
const path_1 = __importDefault(require("path"));
const handlebars = require('express-handlebars');
// Global variables
const app = express_1.default();
const PORT = 8080;
// Middleware
app.engine('hbs', handlebars({
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
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`);
});
// Router
app.use('/api', products_1.productRoutes);
