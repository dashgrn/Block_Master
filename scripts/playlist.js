
const PLAYLIST_URL = 'http://localhost:4002/playlist'

const heartIco = document.getElementById('heartIco')
const rowTemplate = document.getElementById('rowTemplate')
const rowContainer = document.getElementById('rowContainer')
const emptyInfo = document.getElementById('emptyInfo')

const getList = async () => {
    let listDataReq = await fetch(PLAYLIST_URL)
    let listDataRes = await listDataReq.json()
    console.log(listDataRes)
    return listDataRes
}

document.addEventListener('DOMContentLoaded', async () => {
    let listDataRes = await getList()
    console.log(listDataRes)
    if(listDataRes === null || listDataRes === undefined || listDataRes) {
        emptyInfo.innerText = 'Tu lista está vacía'
    } else {
        listDataRes.forEach(movie => {
            let heartClass
            if (movie.liked === "true") {
                heartClass = "fas fa-heart has-text-white"
            } else {
                heartClass = "far fa-heart has-text-white"
            }
            rowContainer.innerHTML += `
            <tr>
            <td id="heartIco" class="is-vcentered" width="5%"><i heartId="${movie.id}" class="${heartClass}"></i></td>
            <td class="has-text-white is-vcentered">${movie.title}</td>
            <td id="deleteTd" class=""><a id="${movie.id}" class="button is-small is-danger is-vcentered">Eliminar</a></td>
            </tr>
            `
        });
    }
    
})

//deleting funct
const deleteFromPlaylist = async (evt) => {
    let idToDelete = evt.target.id
    if (idToDelete != '' && evt.target.tagName === 'A') {
        await fetch(`${PLAYLIST_URL}/${idToDelete}`, {
            method: 'DELETE',
        })
    }
}

//add and remove heart funct
const addHeart = async (evt) => {
    let idToHeart = evt.target.attributes[0].value
    let nameToHeart = evt.target.parentNode.nextElementSibling.textContent
    console.log(nameToHeart)
    console.log(idToHeart)
    console.log(evt.target)
    if (evt.target.classList[0] === 'far') {
        let heartObj = {
            liked: "true",
            title: nameToHeart,
            id: idToHeart
        }
        if (idToHeart != '' && evt.target.tagName === 'I') {
            await fetch(`${PLAYLIST_URL}/${idToHeart}`, {
                method: 'PUT',
                body: JSON.stringify(heartObj),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then(() => {
                evt.target.classList[0] = ''
                evt.target.classlist[0] = 'fas'
            })
        }
    } else {
        let heartObj = {
            liked: "false",
            title: nameToHeart,
            id: idToHeart
        }
        if (idToHeart != '' && evt.target.tagName === 'I') {
            await fetch(`${PLAYLIST_URL}/${idToHeart}`, {
                method: 'PUT',
                body: JSON.stringify(heartObj),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then(() => {
                evt.target.classList[0] = ''
                evt.target.classlist[0] = 'far'
            })
        }
    }

}

rowContainer.addEventListener('click', async (evt) => {
    deleteFromPlaylist(evt)
    addHeart(evt)
})