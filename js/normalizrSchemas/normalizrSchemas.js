"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = void 0;
const normalizr_1 = require("normalizr");
const author = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'email' });
exports.authorSchema = new normalizr_1.schema.Entity('autores', {
    author: author
});
