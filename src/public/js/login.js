const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/api/products')
        }
        else if(result.status === 404){
            alert("correo invalido, resivar credenciales!")
        }
        else if(result.status === 401){
            alert("Login invalido, resivar credenciales!")
        }
        else if(result.status === 500){
            alert("revisa datos incorrectos")
        }
    }).catch(function(error){
        alert("resivar")
    })
})

