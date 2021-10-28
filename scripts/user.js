let saveBtn = document.getElementById('saveBtn')
let url = 'http://localhost:4001/users'

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let nameInput = document.getElementById('nameInput').value
    let usernameInput = document.getElementById('usernameInput').value
    let emailInput = document.getElementById('emailInput').value

    if (nameInput === '' || usernameInput === '' || emailInput === ''){
        alert('Verifica los datos ingresados, no deben estár vacíos')
    } else {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name_: nameInput,
                username: usernameInput,
                email: emailInput
            }),
            headers: {
                'Content-Type':"application/json; charset=UTF-8"
            }
        })
    }
    
})

searchBtn.addEventListener('click', async () => {
    let email = document.getElementById('email').value
    document.getElementById('emailInput').readOnly = true

    let res = await fetch('http://localhost:4002/usuarios')
    let data = await res.json()
    console.log(data)
    let search = data.find(user => user.correo.toLowerCase() === email.toLowerCase())
    const {nombre, apellido, correo, id} = search
    console.log(nombre, apellido, correo, id)

    document.getElementById('name').value = nombre
    document.getElementById('lastName').value = apellido
    document.getElementById('email').value = correo
    document.getElementById('id').value = id
})



