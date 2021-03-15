"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementsInTable = exports.saveMessagesInDB = exports.checkIfTable = exports.createTableMensajes = void 0;
const { options } = require('../options/sqlite3.js');
const knex = require('knex')(options);
const createTableMensajes = (tableName) => {
    knex.schema.createTable(tableName, function (table) {
        table.increments('id');
        table.string('user').notNullable();
        table.text('message').notNullable();
        table.string('date').notNullable();
    })
        .then(() => console.log(`Tabla ${tableName} ha sido creada`))
        .catch((err) => console.log(err))
        .finally(() => {
        knex.destroy();
    });
};
exports.createTableMensajes = createTableMensajes;
const checkIfTable = (createTableCallback, tableName) => {
    knex.schema.hasTable(tableName).then(function (exists) {
        if (!exists) {
            createTableCallback(tableName);
        }
        else if (exists) {
            console.log(`La tabla ${tableName} ya existe`);
        }
    })
        .catch((err) => console.log(err));
};
exports.checkIfTable = checkIfTable;
const saveMessagesInDB = (messagesInMemory) => {
    knex('mensajes').insert(messagesInMemory)
        .then((value) => console.log('Mensajes guardados'))
        .catch((err) => console.log(err));
};
exports.saveMessagesInDB = saveMessagesInDB;
const elementsInTable = () => {
    knex('mensajes').select('*')
        .then((res) => console.log(res))
        .catch((err) => err);
};
exports.elementsInTable = elementsInTable;
