import express from 'express';

import { productRoutes } from './productRoutes';

import { viewsRoutes } from './viewsRoutes';

import path from 'path'; 

import handlebars from 'express-handlebars';

import MetodosServidor from './handlerClass';

import fs from 'fs';

// Global variables

const app = require('express')();

const http = require('http').Server(app);

const io = require('socket.io')(http);

const PORT = 8080;

let productos = []

export let instance = new MetodosServidor([]);

let chatMessages = []


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

const server = http.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});


io.on('connection', (socket) => {
    console.log('Usuario conectado')

    socket.on('disconnect', () => {
        if (io.engine.clientsCount === 0) {
            fs.appendFile('./messages.txt', JSON.stringify(chatMessages), 'utf8', (err) => {
                if (err) throw err;
              });
            chatMessages = []
        }
      });

    socket.emit('ingreso', {productos, chatMessages})

    socket.on('producto cargado', (data) => {
        io.emit('nuevo producto', data);
        productos.push(data);
    })

    socket.on('new message', (payload) => {
        chatMessages.push(payload)
        io.emit('chat', chatMessages);
    })

})

server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`)
});

// Router

app.use('/api', productRoutes);

app.use('/', viewsRoutes);



