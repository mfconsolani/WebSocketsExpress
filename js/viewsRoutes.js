"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server_1 = require("./server");
exports.viewsRoutes = express_1.default.Router();
//  Renderiza productos en UI
exports.viewsRoutes.get('/productos/vista', (req, res) => {
    server_1.instance.renderApp(req, res);
});
// 
exports.viewsRoutes.get('/productos/socketForm', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/WSindex.html"));
});
