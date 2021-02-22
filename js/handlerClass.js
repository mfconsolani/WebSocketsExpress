"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (id !== 0 && this.database.length > 0 && productSearched) {
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
        if (id !== 0 && this.database.length > 0 && itemToModify) {
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
        if (id !== 0 && this.database.length > 0 && itemToRemove) {
            this.database = this.database.filter(element => element.id !== id);
            return response.status(200).json(itemToRemove);
        }
        return response.status(200).send({ alerta: 'producto no encontrado' });
    }
    renderApp(request, response) {
        response.render('main', { data: this.database });
    }
}
;
exports.default = MetodosServidor;
