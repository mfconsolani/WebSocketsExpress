import express, { Application } from 'express';

import { productRoutes } from './productRoutes';

import { viewsRoutes } from './viewsRoutes';

import path from 'path'; 

import handlebars from 'express-handlebars';

import { Socket } from 'socket.io';

import MetodosServidor from './handlerClass';

// Global variables

const app:Application = require('express')();

const http = require('http').Server(app);

const io = require('socket.io')(http);

const PORT = 8080;

let productos:Array<object> = []

export let instance = new MetodosServidor([]);


// Middleware

app.engine('hbs', 
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        partialsDir: path.join(__dirname, '../views/partials')
        })
    );

app.set('view engine', 'hbs');

app.set('views', './views');

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Server Port config

const server:any = http.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});


io.on('connection', (socket:Socket) => {
    console.log('Usuario conectado')

    socket.emit('ingreso', productos)

    socket.on('producto cargado', (data:any) => {
        io.emit('nuevo producto', data);
        productos.push(data);
    })

})

server.on("Error", (error:Error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`)
});

// Router

app.use('/api', productRoutes);

app.use('/', viewsRoutes);



