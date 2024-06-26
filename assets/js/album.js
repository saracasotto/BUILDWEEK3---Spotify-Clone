// Base URL for the Deezer API to get album information
const apiBase = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let album = null;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");


document.addEventListener("DOMContentLoaded", async () => {
  await asideArtist();
  await albumClick();
  await getAlbum();
});

//Async function to fetch album data from the API
async function getAlbum() {
  try {
    const response = await fetch(apiBase + id);
    const data = await response.json();

    const { title, cover_xl, release_date, tracks, artist } = data;

    document.getElementById("album-cover").src = cover_xl;
    document.getElementById("card-title-album").innerText = title;
    document.getElementById("card-text-artist").innerHTML = `<a href="./artist.html?id=${artist.id}">${artist.name}</a>`;
    document.getElementById("card-text2").innerText =
      " · " + release_date + " · " + tracks.data.length + " tracks";

    let songs = "";
    //Loop through each track and create a table row with the track details
    tracks.data.forEach((track, i) => {
      songs += `<tr>

                        <th scope="row">${i + 1}</th>
                        <td>
                        <p class="track-title">${track.title}</p>
                        <p class="artist-name">${track.artist.name}</p></td>
                        <td class="audio-controls"><audio controls>
                            <source src="${
                              track.preview
                            }" type="audio/mp3"></audio>
                        </td>
                        <td>
                            <i class="bi bi-play-fill" onclick="loadPlayer('${track.album.cover_xl}', '${track.title}', '${track.artist.name}', '${track.preview}')"></i>
                        </td>
                        <td>${Math.floor(track.duration / 60)}:${
        track.duration % 60 < 10 ? "0" : ""
      }${track.duration % 60}</td>
                    </tr>`;
    });

    //Update the inner HTML of the tracks element with the generated track list
    document.getElementById("tracks").innerHTML = songs;

  } catch (error) {
    console.error("Error fetching album data:", + error);
  }
}
