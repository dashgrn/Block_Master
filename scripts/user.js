const saveBtn = document.getElementById('saveBtn')
const searchBtn = document.getElementById('searchBtn')
const updateBtn = document.getElementById('editBtn')
const deleteBtn = document.getElementById('deleteBtn')
const url = 'http://localhost:4001/users'

let currentId = 0

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nameInput').value = ''
    document.getElementById('usernameInput').value = ''
    document.getElementById('emailInput').value = ''
})

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let nameInput = document.getElementById('nameInput').value
    let usernameInput = document.getElementById('usernameInput').value
    let emailInput = document.getElementById('emailInput').value

    if (nameInput === '' || usernameInput === '' || emailInput === '') {
        alert('Verifica los datos ingresados, no deben estár vacíos')
    } else {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name_: nameInput,
                username: usernameInput,
                email_: emailInput
            }),
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
        })
    }

})


searchBtn.addEventListener('click', async () => {
    let email = document.getElementById('emailInput').value
    document.getElementById('emailInput').readOnly = true

    let res = await fetch('http://localhost:4001/users')
    let data = await res.json()
    console.log(data)
    let search = data.find(user => user.email_.toLowerCase() === email.toLowerCase())
    if (search === undefined) {
        alert('No se ha encontrado ningúna coincidencia')
        document.getElementById('emailInput').readOnly = false
        return
    } else {
        const { name_, username, email_, id } = search
        console.log(name_, username, email_, id)

        document.getElementById('nameInput').value = name_
        document.getElementById('usernameInput').value = username
        document.getElementById('emailInput').value = email_
        currentId = id
    }

})

updateBtn.addEventListener("click", async (e) => {
    let nameInput = document.getElementById('nameInput').value
    let usernameInput = document.getElementById('usernameInput').value
    let emailInput = document.getElementById('emailInput').value  
    await fetch(`${url}/${currentId}`,{
      method: "PUT",
      body: JSON.stringify({
        name_: nameInput,
        username: usernameInput,
        email_: emailInput
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });
  });
  deleteBtn.addEventListener("click", async (e) => {  
    await fetch(`${url}/${currentId}`,{
      method: "DELETE"
    });
  });