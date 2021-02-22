import { Request, Response } from 'express';

import path from 'path';


export interface Product {
    title: string,
    price: number,
    thumbnail: string,
    id: number
};

class MetodosServidor{

    database: Array<Product>;
    
    constructor(database: Array<Product>){

        this.database = database;
    };
    
    displayAll(response: Response){
        
        this.database.length 
        ? response.json(this.database) 
        : response.status(200).json({ alerta: 'no hay productos cargados' })
    };

    displayOne(request: Request, response: Response){

        let { id }:any = request.params;

        id = parseInt(id);
        
        const productSearched = this.database.filter((product: Product) => product.id === id)[0];

        if (id !== 0 && this.database.length && productSearched){

            return response.status(200).json(productSearched)
        } 
        
        return response.status(200).send({ alerta: 'producto no encontrado' })
    }

    saveProduct(request: Request, response: Response){

        const newId:number =  this.database.length == 0 ? 1 : this.database.slice(-1)[0].id +1 

        let {title, price, thumbnail }: any = request.body

        price = parseFloat(price);

        const nuevoItem: Product =  { 
            title,
            price,
            thumbnail,
            id: newId
        };

        this.database.push(nuevoItem)
        
        request.headers['content-type'] === 'application/x-www-form-urlencoded'
        ? response.status(201).redirect('/index.html')
        : response.status(201).json(nuevoItem)

    }

    replaceData(request: Request, response: Response){

        let { id }:any = request.params

        id = parseInt(id);

        let itemToModify: any = this.database.filter(element => element.id === id)[0]   

        
        if (id !== 0 && this.database.length && itemToModify){
            
            const propsToReplace = Object
                .keys(request.body)
                .filter((key:string) => itemToModify[key] !== request.body[key])
            
            propsToReplace
            ? propsToReplace.forEach((prop:string) => itemToModify[prop] = request.body[prop])
            : null
            
            return response.status(200).json(itemToModify)
        }

        return response.status(200).send({ alerta: 'producto no encontrado' })
    }

    deleteItem(request: Request, response: Response){

        let { id }:any = request.params

        id = parseInt(id)

        const itemToRemove = this.database.filter(element => element.id === id)[0]

        if (id !== 0 && this.database.length && itemToRemove){

            this.database = this.database.filter(element => element.id !== id) 
            return response.status(200).json(itemToRemove);
        } 

        return response.status(200).send({ alerta: 'producto no encontrado' })
    }

    renderApp(request: Request, response: Response){

        response.render(path.join(__dirname, '../views/layouts/main'), {data: this.database})
    }

};

export default MetodosServidor;