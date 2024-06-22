document.addEventListener("DOMContentLoaded", async () => {

    await asideArtist()
    await albumClick()
    displayArtist()

})


const params = new URLSearchParams(location.search)
let id = params.get('id')

//params.set('idartist', id);

// console.log(params.toString());

function displayArtist() {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + id, {

    })
        .then(response => {
            // console.log(response)
            response.json()
                .then(data => {
                    console.log(data);

                    let mostraArtista = document.getElementById('artist-container')
                    mostraArtista.style.backgroundImage = `url(${data.picture_big})`;
                    mostraArtista.style.backgroundSize = 'cover';
                    mostraArtista.style.backgroundPosition = 'top';
                    mostraArtista.style.backgroundRepeat = 'no-repeat';
                    mostraArtista.innerHTML = `
                    <div class="card-body">
                    <h5>${data.name}</h5>
                    </div>
                    `;
                })
        })
        .catch(error => {
            console.log('Errore nella richiesta fetch:', error);
        });
}

