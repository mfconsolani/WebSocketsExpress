"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
;
class MetodosServidor {
    constructor(database) {
        this.database = database;
    }
    ;
    displayAll(response) {
        this.database.length
            ? response.json(this.database)
            : response.status(200).json({ alerta: 'no hay productos cargados' });
    }
    ;
    displayOne(request, response) {
        let { id } = request.params;
        id = parseInt(id);
        const productSearched = this.database.filter((product) => product.id === id)[0];
        if (id !== 0 && this.database.length && productSearched) {
            return response.status(200).json(productSearched);
        }
        return response.status(200).send({ alerta: 'producto no encontrado' });
    }
    saveProduct(request, response) {
        const newId = this.database.length == 0 ? 1 : this.database.slice(-1)[0].id + 1;
        let { title, price, thumbnail } = request.body;
        price = parseFloat(price);
        const nuevoItem = {
            title,
            price,
            thumbnail,
            id: newId
        };
        this.database.push(nuevoItem);
        request.headers['content-type'] === 'application/x-www-form-urlencoded'
            ? response.status(201).redirect('/index.html')
            : response.status(201).json(nuevoItem);
    }
    replaceData(request, response) {
        let { id } = request.params;
        id = parseInt(id);
        let itemToModify = this.database.filter(element => element.id === id)[0];
        if (id !== 0 && this.database.length && itemToModify) {
            const propsToReplace = Object
                .keys(request.body)
                .filter((key) => itemToModify[key] !== request.body[key]);
            propsToReplace
                ? propsToReplace.forEach((prop) => itemToModify[prop] = request.body[prop])
                : null;
            return response.status(200).json(itemToModify);
        }
        return response.status(200).send({ alerta: 'producto no encontrado' });
    }
    deleteItem(request, response) {
        let { id } = request.params;
        id = parseInt(id);
        const itemToRemove = this.database.filter(element => element.id === id)[0];
        if (id !== 0 && this.database.length && itemToRemove) {
            this.database = this.database.filter(element => element.id !== id);
            return response.status(200).json(itemToRemove);
        }
        return response.status(200).send({ alerta: 'producto no encontrado' });
    }
    renderApp(request, response) {
        response.render(path_1.default.join(__dirname, '../views/layouts/main.hbs'), { data: this.database });
    }
}
;
exports.default = MetodosServidor;
