"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFormatter = void 0;
const messageFormatter = (payload, sessionChat, chatToNormalize) => {
    let mensaje = {
        id: payload.email,
        author: {
            email: payload.email,
            nombre: payload.nombre,
            apellido: payload.apellido,
            edad: payload.edad,
            alias: payload.alias,
            avatar: payload.avatar
        },
        text: payload.text,
        date: payload.date
    };
    sessionChat.push(mensaje);
    const { date } = mensaje, rest = __rest(mensaje, ["date"]);
    chatToNormalize.push(rest);
    return;
};
exports.messageFormatter = messageFormatter;
