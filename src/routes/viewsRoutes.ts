import express, {Request, Response} from 'express';

import path from 'path';

import { instance } from '../server';

export const viewsRoutes = express.Router();

declare module "express-session" {
    interface Session {
      user: string;
    }
  }


//  Renderiza productos en UI

viewsRoutes.get('/productos/vista', (req: Request, res: Response) => {    
    instance.renderApp(req, res);
});

// 

viewsRoutes.get('/productos/chat', (req:Request, res:Response) => {
    if (req.session.user){
        return res.cookie('usuario', req.session.user, {maxAge:6000}).sendFile(path.join(__dirname, "../../public/WSindex.html"))
    } else {
        return res.redirect('/login')
    }
});

viewsRoutes.get('/login', (req:Request, res:Response) => {
    if (req.session.user){
        return res.redirect('/productos/chat')
    }
    return res.sendFile(path.join(__dirname, "../../public/login.html"))
});

viewsRoutes.post('/login', (req:Request, res:Response) => {
    let userName = req.body.username
    req.session.user = userName
    return res.cookie('usuario', req.session.user, {maxAge:6000}).redirect('/productos/chat')

});


viewsRoutes.get('/logout', (req:Request, res:Response) => {
    if (req.session.user){
        req.session.destroy((err:Error) => {
            if (!err){
                return res.sendFile(path.join(__dirname, "../../public/farewell.html"))
            } else {
                console.log('Se produjo un error:', err)
            }
        })
    } else if (!req.session.user){
        return res.redirect('/login')
    }
});
