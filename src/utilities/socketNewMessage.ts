
export const messageFormatter = (payload:any, sessionChat:any, chatToNormalize:any) => {
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
    }
    sessionChat.push(mensaje)
    const { date, ...rest } = mensaje 
    chatToNormalize.push(rest)
    return
} 