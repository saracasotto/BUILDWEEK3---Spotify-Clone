
const api = "https://striveschool-api.herokuapp.com/api/deezer/album/"
let album = null
const params = new URLSearchParams(window.location.search)

document.addEventListener("DOMContentLoaded", async()=>{
  await asideArtist()
  await albumClick()
}) 

console.log(params)

const id = params.get("id")
const title = params.get("title")
const cover = params.get("cover")
const cover_xl = params.get("cover_xl")
const tracks = params.get("tracks")
const release_date = params.get("release_date")
const name = params.get("name")

getAlbum()

async function getAlbum() {
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)

    let songs = ""
    tracks.map((track, i) => {
        songs += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${track.title}</td>
                    <td>${track.artist.name}</td>
                    <td>${track.duration} seconds</td>
                    <td><audio controls>
  <source src=${track.preview} type="audio/mp3">
</audio></td>
                </tr>`
                
    })

    document.getElementById("albumTable").classList.remove("d-none")
    document.getElementById("tracks").innerHTML = songs

    album = `<div class="card mb-3" style="width:100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${cover_xl} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <p class="card-text"><small class="text-body-secondary">Album</small></p>
        <h1 class="card-title">${title}</h1>
        <span class="card-text"><small class="text-body-secondary">${name}</small></span>
        <span class="card-text"><small class="text-body-secondary">• ${release_date}</small></span>
        <span class="card-text"><small class="text-body-secondary">• ${tracks.length} tracks</small></span>
        
      </div>
    </div>
  </div>
</div>`

    document.getElementById("searchResults").innerHTML = album

}
