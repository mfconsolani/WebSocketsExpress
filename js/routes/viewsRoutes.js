"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server_1 = require("../server");
exports.viewsRoutes = express_1.default.Router();
//  Renderiza productos en UI
exports.viewsRoutes.get('/productos/vista', (req, res) => {
    server_1.instance.renderApp(req, res);
});
// 
exports.viewsRoutes.get('/productos/chat', (req, res) => {
    if (req.session.user) {
        return res.cookie('usuario', req.session.user, { maxAge: 60000 }).sendFile(path_1.default.join(__dirname, "../../public/WSindex.html"));
    }
    else {
        return res.redirect('/login');
    }
});
exports.viewsRoutes.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/productos/chat');
    }
    return res.sendFile(path_1.default.join(__dirname, "../../public/login.html"));
});
exports.viewsRoutes.post('/login', (req, res) => {
    let userName = req.body.username;
    req.session.user = userName;
    return res.cookie('usuario', req.session.user, { maxAge: 60000 }).redirect('/productos/chat');
});
exports.viewsRoutes.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (!err) {
                return res.sendFile(path_1.default.join(__dirname, "../../public/farewell.html"));
            }
            else {
                console.log('Se produjo un error:', err);
            }
        });
    }
    else if (!req.session.user) {
        return res.redirect('/login');
    }
});
