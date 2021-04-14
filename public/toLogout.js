
const renderToLogout = () => {
    
    let mainContainer = document.getElementById('mainContainer')
    const toLogout = document.createElement('h3')
    toLogout.setAttribute('id', 'userName')
    toLogout.className = "alert alert-success text-center align-middle m-5"
    toLogout.innerText = `Bienvenido ${unescape(document.cookie).split('=')[1]}!`


    const logoutButton = document.createElement('a')
    logoutButton.setAttribute('id', 'logout')
    logoutButton.className = "btn btn-warning text-end align-end m-2"
    logoutButton.onclick = function(){
        logoutButton.href = "/logout";
      };
    logoutButton.innerText = "Logout"
    toLogout.appendChild(logoutButton)

    mainContainer.prepend(toLogout);
}

if (document.cookie){
    renderToLogout()   
}
