const socket = io();

const form = document.getElementById('form');

const title = document.getElementById('title');

const price = document.getElementById('price');

const thumbnail = document.getElementById('thumbnail');

const tableBody = document.getElementById('tbody');

const table = document.getElementById('table');

const tableContainer = document.getElementById('tableContainer');

const user = document.getElementById('email')

const chatForm = document.getElementById('chatForm')

const renderItem = (product) => {

    const nuevaFila = document.createElement('tr');

    tableBody.appendChild(nuevaFila)
    
    // titulo

    let nuevoTitulo = document.createElement('td');
    
    nuevoTitulo.textContent = product.title
    
    nuevaFila.appendChild(nuevoTitulo)
    
    // precio
    
    let nuevoPrecio = document.createElement('td')
    
    nuevoPrecio.textContent = `US$ ${product.price}`
    
    nuevaFila.appendChild(nuevoPrecio)
    
    // foto

    let nuevoThumbnail = document.createElement('td')

    let foto = document.createElement('img')
    
    foto.setAttribute("style", "height: 100px;");
    
    foto.src = product.thumbnail
    
    nuevaFila.appendChild(nuevoThumbnail).appendChild(foto)

    // Bootstrap classes for td tags

    let tableData = document.querySelectorAll('td')
    
    tableData.forEach(element => {
        element.className = "align-middle text-center"
    })
}

const renderAlert = () => {
    const alertDiv = document.createElement('div')
    
    alertDiv.setAttribute('id', 'alertDiv')

    alertDiv.className = "alert alert-danger text-center align-middle m-5"

    tableContainer.appendChild(alertDiv);

    const alertContent = document.createElement('p')

    alertContent.innerText = "No se encontraron productos"

    alertDiv.appendChild(alertContent)
}

const renderMessages = (payload) => {
    let html = payload.map(element => {
        return(`<div>
        <span style="color: blue; font-weight: bold;">
        ${element.user} <span style="color: brown; font-weight: normal;">[${element.date}]</span>
        </span>:
        <em style="color: green">${element.message}</em> </div>`)
    }).join(" ");
    document.getElementById('chatContainer').innerHTML = html
}

socket.on('ingreso', payload => {
    
    if (payload.productos.length) {
        
        payload.productos.forEach(prod => renderItem(prod)) 
        
    } else {
        
        renderAlert()
    }

    if (payload.chatMessages.length) {
        renderMessages(payload.chatMessages);
    }

});


form.addEventListener('submit', function(e) {

    e.preventDefault();
    
    let producto = {
        'title': title.value,
        'price': price.value,
        'thumbnail': thumbnail.value
    }

    if (producto) {
    
        if (document.body.contains(document.getElementById('alertDiv'))) {
            document.getElementById('alertDiv').setAttribute("style", "display: none;")   
        }

    socket.emit('producto cargado', producto);
    
    title.value = ''
    price.value = ''
    thumbnail.value = ''

    }
});


const addMessage = () => {

    let message = document.getElementById('messageToSend').value
    let userEmail = user.value
    let date = new Date
    date = date.toLocaleString()
    socket.emit('new message', {
        user: userEmail, 
        message: message,
        date: date})
    
        document.getElementById('messageToSend').value = ''

    return
}

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    addMessage()  
})

socket.on('nuevo producto', data => {   
    
    if (document.body.contains(document.getElementById('alertDiv'))) {
        document.getElementById('alertDiv').setAttribute("style", "display: none;")   
    }
    
    renderItem(data)
});


socket.on('chat', payload => {
    renderMessages(payload)
})


