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
                    // console.log(data);

                    let mostraArtista = document.getElementById('artist-container')
                    mostraArtista.style.backgroundImage = `url(${data.picture_big})`;
                    mostraArtista.style.backgroundSize = 'cover';
                    mostraArtista.style.backgroundPosition = 'center';
                    mostraArtista.style.backgroundRepeat = 'no-repeat';
                    mostraArtista.innerHTML = `
                    <div class="card-body">
                    <h5>${data.name}</h5>
                    </div>
                    `;

                    fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id, {

                    })
                    .then(response => {
                        // console.log(response)
                        response.json()
                        .then(singleTrack => {
                            let counter = 1; 
                            // console.log(singleTrack.tracks.data)
                            singleTrack.tracks.data.forEach(element => {
                                // console.log(element)
                                let tracks = document.getElementById('tracks')
                                tracks.innerHTML += 
                                `
                                <td>${counter}</td>
                                <td><img src="${element.picture_big}"></ img></td>
                                <td>${element.title}</td>
                                <td>${element.rank}</td>
                                <td>${element.duration}</td>
                               
                                `
                                counter ++
                            });
                        })
                    })


                })
        })
        .catch(error => {
            console.log('Errore nella richiesta fetch:', error);
        });
}

