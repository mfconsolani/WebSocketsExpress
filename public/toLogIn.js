
const renderToLogout = () => {
    
    let alertDiv = document.getElementById('toLogIn')
    const toLogout = document.createElement('h4')
    toLogout.setAttribute('id', 'userName')
    toLogout.innerText = `Hasta luego ${unescape(document.cookie).split('=')[1]}!`

    alertDiv.prepend(toLogout);
}

if (document.cookie){
    renderToLogout()
    setTimeout(function () {
        window.location = "/login";
     }, 2000)
}
