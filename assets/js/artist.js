document.addEventListener("DOMContentLoaded", async () => {
    await asideArtist();
    await albumClick();
    displayArtist();
});

const params = new URLSearchParams(location.search);
let id = params.get('id');

function displayArtist() {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + id)
        .then(response => response.json())
        .then(data => {
            let mostraArtista = document.getElementById('artist-container');
            mostraArtista.style.backgroundImage = `url(${data.picture_big})`;
            mostraArtista.style.backgroundSize = 'scale';
            mostraArtista.style.backgroundPosition = 'center';
            mostraArtista.style.backgroundRepeat = 'no-repeat';
            mostraArtista.innerHTML = `
                <div class="card-body">
                    <h5>${data.name}</h5>
                </div>
            `;

            // Fetch popular tracks of the artist
            fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + id + "/top?limit=20")
                .then(response => response.json())
                .then(tracksData => {
                    let counter = 1;
                    let tracks = document.getElementById('tracks');
                    tracks.innerHTML = ""; 

                    tracksData.data.forEach(element => {
                        tracks.innerHTML += `
                            <tr>
                                <td>${counter}</td>
                                <td><img src="${element.album.cover_small}" alt="${element.title} cover"></td>
                                <td>${element.title}</td>
                                <td><audio controls class="audio-controls">
                            <source src="${element.preview}" type="audio/mp3"></audio></td>
                                <td>${Math.floor(element.duration / 60)}:${element.duration % 60 < 10 ? "0" : ""}${element.duration % 60}</td>
                            </tr>
                        `;
                        counter++;
                    });
                })
                .catch(error => {
                    console.log('Errore nel recupero delle tracce:', error);
                });
        })
        .catch(error => {
            console.log('Errore nella richiesta fetch:', error);
        });
}


