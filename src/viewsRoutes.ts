import express, {Request, Response} from 'express';

import path from 'path';

import { instance } from './server';

export const viewsRoutes = express.Router();


//  Renderiza productos en UI

viewsRoutes.get('/productos/vista', (req: Request, res: Response) => {    
    instance.renderApp(req, res);
});

// 

viewsRoutes.get('/productos/socketForm', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, "../public/WSindex.html"))
});