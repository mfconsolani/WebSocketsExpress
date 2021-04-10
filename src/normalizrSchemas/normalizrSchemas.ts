import {schema} from 'normalizr';

const author = new schema.Entity('author', {}, {idAttribute: 'email'})

export const authorSchema = new schema.Entity('autores', {
    author: author
})

