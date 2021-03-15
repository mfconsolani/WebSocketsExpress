const { options } = require('../options/sqlite3.js')
const knex = require('knex')(options);

export const createTableMensajes = (tableName:any) => {
    knex.schema.createTable(tableName, function (table:any) {
        table.increments('id');
        table.string('user').notNullable();
        table.text('message').notNullable();
        table.string('date').notNullable();
      })
      .then(() => console.log(`Tabla ${tableName} ha sido creada`))
      .catch((err:Error) => console.log(err))
      .finally(()=> {
          knex.destroy();
      })
}

export const checkIfTable = (createTableCallback: any, tableName: any) => {
    knex.schema.hasTable(tableName).then(function(exists:any) {
        if (!exists) {
            createTableCallback(tableName);
        } else if (exists) {
            console.log(`La tabla ${tableName} ya existe`)
    }
  })
  .catch((err:Error) => console.log(err))
}

export const saveMessagesInDB = (messagesInMemory:any) => {
    knex('mensajes').insert(messagesInMemory)
    .then((value:any)=> console.log('Mensajes guardados'))
    .catch((err:Error) => console.log(err))
}

export const elementsInTable = () => {
    knex('mensajes').select('*')
    .then((res:any) => console.log(res))
    .catch((err:Error) => err);
}