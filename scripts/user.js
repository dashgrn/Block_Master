let saveBtn = document.getElementById('saveBtn')
let url = 'http://localhost:4001/users'

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let nameInput = document.getElementById('nameInput').value
    let usernameInput = document.getElementById('usernameInput').value
    let emailInput = document.getElementById('emailInput').value
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
})


