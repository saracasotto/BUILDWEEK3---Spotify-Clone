const apiBase = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let album = null;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    await asideArtist();
    await albumClick();
    await getAlbum();
});

console.log(params);

async function getAlbum() {
    try {
        const response = await fetch(apiBase + id);
        const data = await response.json();
        console.log(data);

        const { title, cover_xl, release_date, tracks, artist } = data;

        document.getElementById("album-cover").src = cover_xl;
        document.getElementById("card-title-album").innerText = title;
        document.getElementById("card-text-artist").innerText = artist.name;

        let songs = "";
        tracks.data.forEach((track, i) => {
            songs += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td><p class="track-title">${track.title}<p>
                        <p class="artist-name">${track.artist.name}<p></td>
                        <td><audio controls class="audio-controls">
                            <source src="${track.preview}" type="audio/mp3"></audio>
                        </td>
                        <td>${Math.floor(track.duration / 60)}:${track.duration % 60 < 10 ? '0' : ''}${track.duration % 60}</td>
                    </tr>`;
        });

        document.getElementById("albumTable").classList.remove("d-none");
        document.getElementById("tracks").innerHTML = songs;

        album = `<div class="card mb-3" style="width:100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${cover_xl}" class="img-fluid rounded-start" alt="${title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <p class="card-text"><small class="text-body-secondary">Album</small></p>
                        <h1 class="card-title">${title}</h1>
                        <span class="card-text"><small class="text-body-secondary">${artist.name}</small></span>
                        <span class="card-text"><small class="text-body-secondary">• ${release_date}</small></span>
                        <span class="card-text"><small class="text-body-secondary">• ${tracks.data.length} tracks</small></span>
                    </div>
                </div>
            </div>
        </div>`;

        document.getElementById("searchResults").innerHTML = album;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}
