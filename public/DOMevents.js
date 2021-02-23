const socket = io();

const form = document.getElementById('form');

const title = document.getElementById('title');

const price = document.getElementById('price');

const thumbnail = document.getElementById('thumbnail');

const tableBody = document.getElementById('tbody')

const table = document.getElementById('table')

const tableContainer = document.getElementById('tableContainer')


const renderItem = (product) => {

    const nuevaFila = document.createElement('tr')

    tableBody.appendChild(nuevaFila)
    
    // titulo

    let nuevoTitulo = document.createElement('td')
    
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

socket.on('ingreso', productos => {
    
    if (productos.length) {
        
        productos.forEach(prod => renderItem(prod)) 
        
    } else {
        
        renderAlert()
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

socket.on('nuevo producto', data => {   
    renderItem(data)
});

