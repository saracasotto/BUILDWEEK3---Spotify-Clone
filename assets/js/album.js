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
        document.getElementById("card-text2").innerText = " · " + release_date + " · " + tracks.data.length + " tracks";

        

        let songs = "";
        tracks.data.forEach((track, i) => {
            songs += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td>
                        <p class="track-title">${track.title}</p>
                        <p class="artist-name">${track.artist.name}</p></td>
                        <td><audio controls class="audio-controls">
                            <source src="${track.preview}" type="audio/mp3"></audio>
                        </td>
                        <td>${Math.floor(track.duration / 60)}:${track.duration % 60 < 10 ? '0' : ''}${track.duration % 60}</td>
                    </tr>`;
        });

        document.getElementById("albumTable").classList.remove("d-none");
        document.getElementById("tracks").innerHTML = songs;

    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}
