import express, { Application } from 'express';

import { productRoutes } from './routes/productRoutes';

import { viewsRoutes } from './routes/viewsRoutes';

import path from 'path'; 

import handlebars from 'express-handlebars';

import { Socket } from 'socket.io';

import MetodosServidor from './handlerClass';

import { Mensaje } from './db/mensajesModel';

import { authorSchema } from './normalizrSchemas/normalizrSchemas';

import { normalize, denormalize } from 'normalizr';

import { messageFormatter } from './utilities/socketNewMessage';

import { CRUD } from './db/config'

import session from 'express-session';

import cookieParser from 'cookie-parser';

import MongoStore from 'connect-mongo'

import dotenv from 'dotenv'

// Global variables

const app:Application = require('express')();

const http = require('http').Server(app);

const io = require('socket.io')(http);

const PORT = 8080;

let productos:Array<object> = []

export let instance = new MetodosServidor([]);

let chatMessages:any = []

let chatMessagesFormatted: any = []


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

app.use(cookieParser())

const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true}

dotenv.config()

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@cluster0.3y0bt.mongodb.net/session?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions,
        ttl: 600
    }),
    secret: 'super hard to guess',
    resave: false,
    saveUninitialized: false
  }))


  
// DB & Mongoose

CRUD()

// Server Port config

const server:any = http.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});

io.on('connection', (socket:Socket) => {
    console.log('Usuario conectado')

    socket.on('disconnect', () => {
        if (io.engine.clientsCount === 0) {
            
            chatMessages.forEach(async (mensaje:any) => {
                let saveMessages = new Mensaje(mensaje)
                await saveMessages.save()
            })
            
            chatMessages = []
            chatMessagesFormatted = []
        }
      });

    socket.emit('ingreso', {productos, chatMessages})

    socket.on('producto cargado', (data:any) => {
        io.emit('nuevo producto', data);
        productos.push(data);
    })

    socket.on('new message', (payload:any) => {
        messageFormatter(payload, chatMessages, chatMessagesFormatted)
        const normalizedData = normalize(chatMessagesFormatted, [authorSchema])
        const denormalizedData = denormalize(normalizedData.result, [authorSchema], normalizedData.entities)

        io.emit('chat', {chatMessages, normalizedData, denormalizedData});
    })

})

server.on("Error", (error:Error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`)
});

// Router

app.use('/api', productRoutes);

app.use('/', viewsRoutes);



