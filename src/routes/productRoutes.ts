import express, {Request, Response} from 'express';

import { instance } from '../server';

export const productRoutes = express.Router();


// Get requests

// Listar todos los productos
productRoutes.get('/productos', (req: Request, res: Response) => {    
    instance.displayAll(res);
});

// Listar un producto específico
productRoutes.get('/productos/:id', (req: Request, res: Response) => {
    instance.displayOne(req, res);    
});


// Post requests

// Cargar un nuevo producto
productRoutes.post('/productos/', (req: Request, res: Response)=> { 
    instance.saveProduct(req, res)
});

// Put requests

// Reemplzar datos

productRoutes.put('/productos/:id', (req: Request, res: Response)=> {
    instance.replaceData(req, res);
});

// Delete requests

// Elimina un producto

productRoutes.delete('/productos/:id', (req: Request, res: Response) => {
    instance.deleteItem(req, res)
});