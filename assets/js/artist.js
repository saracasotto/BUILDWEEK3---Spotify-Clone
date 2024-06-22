document.addEventListener("DOMContentLoaded", async () => {
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
            mostraArtista.style.backgroundSize = 'cover';
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
                    tracks.innerHTML = ""; // Svuota il contenitore delle tracce

                    tracksData.data.forEach(element => {
                        tracks.innerHTML += `
                            <tr>
                                <td>${counter}</td>
                                <td><img src="${element.album.cover_small}" alt="${element.title} cover"></td>
                                <td>${element.title}</td>
                                <td><i class="bi bi-play-fill play-button" 
                                       data-preview="${element.preview}" 
                                       data-album-cover="${element.album.cover_big}"
                                       data-artist="${data.name}" 
                                       data-title="${element.title}" 
                                       style="cursor: pointer;"></i></td>
                                <td>${Math.floor(element.duration / 60)}:${element.duration % 60 < 10 ? "0" : ""}${element.duration % 60}</td>
                            </tr>
                        `;
                        counter++;
                    });

                   
                    const playButtons = document.querySelectorAll('.play-button');
                    playButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            const previewSrc = button.getAttribute('data-preview');
                            const albumCover = button.getAttribute('data-album-cover');
                            const artistName = button.getAttribute('data-artist');
                            const trackTitle = button.getAttribute('data-title');
                            const audioPlayer = document.getElementById('audioPlayer');
                            const albumImage = document.getElementById('album-image');
                            const playerArtist = document.getElementById('player-artist');
                            const playerTitle = document.getElementById('player-title');

                            audioPlayer.src = previewSrc;
                            audioPlayer.play();
                            albumImage.src = albumCover;
                            albumImage.classList.remove('d-none');
                            playerArtist.textContent = artistName;
                            playerTitle.textContent = trackTitle;
                        });
                    });
                })
                
        })
        .catch(error => {
            console.log('Errore nella richiesta fetch:', error);
        });
}
