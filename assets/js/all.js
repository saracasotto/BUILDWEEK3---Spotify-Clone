const URLSEARCH = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const URLARTIST = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const URLALBUM = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let artists = null;
let albums = null;

async function getArtist(id) {
  const RESPONSE = await fetch(URLARTIST + id);
  if (RESPONSE.status === 500) return false;
  //   // console.log("GETARTIST => response\n", response);
  const data = await RESPONSE.json();
  // console.log("GETARTIST => data\n", data);
  artists = {
    id: data["id"],
    name: data["name"],
    pictureSmall: data["picture_small"],
    pictureMedium: data["picture_medium"],
    pictureBig: data["picture_big"],
    pictureXl: data["picture_xl"],
    nFan: `${data["nb_fan"]}`,
  };
  // console.log("GETARTIST => artists\n", artists));
  return true;
}

/** fetch per la ricerca dell'artista passato come parametro in ingresso
 *  prendo i dati ricevuti e mappo in un array di oggetti solo quelli che mi servono
 */
async function getSearch(query) {
  const response = await fetch(URLSEARCH + query);
  if (!response.ok) {
    throw new Error("OOPS.....ERROR");
  } else {
    // console.log("GETSEARCH => response\n", response);
  }
  const data = await response.json();
  // console.log("GETSEARCH => data\n", data.data);
  albums = data.data.map((ALBUM) => ({
    id: `${ALBUM.album.id}`,
    cover: ALBUM.album.cover,
    coverSmall: ALBUM.album.cover_small,
    coverMedium: ALBUM.album.cover_medium,
    coverBig: ALBUM.album.cover_big,
    coverXl: ALBUM.album.cover_xl,
    title: ALBUM.album.title,
    duration: ALBUM.duration,
    preview: ALBUM.preview,
  }));
  artists = data.data.map((ARTIST) => ({
    id: `${ARTIST.artist.id}`,
    name: ARTIST.artist.name,
    pictureSmall: ARTIST.artist.picture_small,
    pictureMedium: ARTIST.artist.picture_medium,
    pictureBig: ARTIST.artist.picture_big,
    pictureXl: ARTIST.artist.picture_xl,
  }));
  // console.log("GETSEARCH => search\n", searchs);
}

async function getAlbum(id) {
  const RESPONSE = await fetch(URLALBUM + id);
  if (RESPONSE.status === 500) return false;
  //   // console.log("GETARTIST => response\n", response);
  const data = await RESPONSE.json();
  albums = {
    idAlbum: data["id"],
    title: data["title"],
    coverSmall: data["picture_small"],
    coverMedium: data["picture_medium"],
    coverBig: data["picture_big"],
    coverXl: data["picture_xl"],
    artistName: data["artist"]["name"],
    idArtist: data["artist"]["id"],
  };
  // console.log("GETARTIST => artist\n", artist);
  return true;
}

/** aside => artist */
async function asideArtist() {
  await getSearch("a");
  for (let i = 0; i < 16; i++) {
    const ARTIST = artists[i];
    document.getElementById("recent-artists-aside-list").innerHTML += `
    <li>
      <a href="./artist.html?id=${ARTIST.id}">
      <img src="${ARTIST.pictureSmall}" alt="${ARTIST.name}">
      <div>
        <div>${ARTIST.name}</div>
        <div>Artist</div>
      </div>
      </a>
    </li>
    `;
  }
}

/** collapse => album */
async function collapsedTitle(title) {
  document.getElementById("collapsed-title").innerHTML = `
  <h2>${title}</h2>
  `;
}

async function albumCard(
  idHtml,
  idAlbum,
  idArtist,
  albumTitle,
  artistName,
  cover,
  replace
) {
  let innesto = "";
  if (replace === false) innesto += `<div class="card">`;
  innesto += `
  <div class="card-img-container">
      <a href="./album.html?id=${idAlbum}"><img src="${cover}" class="card-img-top" alt="ALBUM IMG"></a>
    </div>
    <div class="card-body">
      <a href="./album.html?id=${idAlbum}">
        <h5 class="card-title">${albumTitle}</h5>
      </a>
      <a href="./artist.html?id=${idArtist}">
        <p class="card-text">${artistName}</p>
      </a>
      <div class="card-button-overlay">
        <i class="bi bi-plus-circle"></i>
      </div>
    </div>
  `;
  if (replace === false) {
    innesto += `</div>`;
    document.getElementById(idHtml).innerHTML += innesto;
  } else {
    document.getElementById(idHtml).innerHTML = innesto;
  }
}

async function artistCard(
  idHtml,
  idArtist,
  picture,
  artistName,
  artistFan,
  replace
) {
  let innesto = "";
  if (replace === false) innesto += `<div class="card">`;
  innesto += `
  <div class="card-img-container">
      <a href="./artist.html?id=${idArtist}"><img src="${picture}" class="card-img-top" alt="ALBUM IMG"></a>
    </div>
    <div class="card-body">
      <a href="./artist.html?id=${idArtist}">
        <p class="card-text">${artistName}</p>
        `;
  if (artistFan !== null)
    innesto += `<p class="card-text">${artistFan} listeners</p>`;
  innesto += `
      </a>
      <div class="card-button-overlay">
        <button class="btn">Follow</button>
      </div>
    </div>
    `;
  if (replace === false) {
    innesto += `</div>`;
    document.getElementById(idHtml).innerHTML += innesto;
  } else {
    document.getElementById(idHtml).innerHTML = innesto;
  }
}

async function albumClick(albumCard) {
  let idAlbum = localStorage.getItem("idAlbum");
  let idArtist = localStorage.getItem("idArtist");
  if (albumCard !== undefined) {
    idAlbum = albumCard.dataset.idalbum;
    idArtist = albumCard.dataset.idartist;
    localStorage.setItem("idAlbum", idAlbum);
    localStorage.setItem("idArtist", idArtist);
    // console.log(
    //   "ALBUMCLICK => if !== UNDEFINED => ",
    //   albumCard !== undefined,
    //   idAlbum,
    //   idArtist
    // );
  } else if (idAlbum === null || idArtist === null) {
    // console.log(
    //   "ALBUMCLICK => if NULL => ",
    //   idAlbum === null && idArtist === null
    // );
    localStorage.setItem("idAlbum", albums[0].id);
    localStorage.setItem("idArtist", artists[0].id);
    idAlbum = albums[0].id;
    idArtist = artists[0].id;
  } else {
    idAlbum = localStorage.getItem("idAlbum");
    idArtist = localStorage.getItem("idArtist");
    // console.log("ALBUMCLICK => else localStorage => ", idAlbum, idArtist);
  }
  loadContent(idAlbum, idArtist);
}
async function loadContent(idAlbum, idArtist) {
  for (let i = 0; i < albums.length; i++) {
    const ALBUM = albums[i];
    if (ALBUM.id === idAlbum) {
      await getArtist(idArtist);
      // console.log("LOADCONTENT => ", idAlbum, idArtist);
      // console.log("ALBUMCLICK => artists\n", artists.id);
      // console.log(ALBUM.title);
      collapsedTitle(ALBUM.title);
      albumCard(
        "song-card",
        ALBUM.id,
        artists.id,
        ALBUM.title,
        artists.name,
        ALBUM.coverMedium,
        true
      );
      artistCard(
        "artist-card",
        artists.id,
        artists.pictureMedium,
        artists.name,
        artists.nFan,
        true
      );
      loadPlayer(ALBUM.coverSmall, ALBUM.title, artists.name);
      break;
    }
  }
}

async function loadPlayer(img, title, artist) {
  document.getElementById("player-album").innerHTML = `
  <img src="${img}" alt="Album">
  `;
  document.getElementById("track-info").innerHTML = `
  <p class="player-title">${title}</p>
  <p class="player-artist">${artist}</p>
  `;
}
document.addEventListener("DOMContentLoaded", async () => {
  const SEARCHINPUT = document.getElementById("searchInput");
  document.getElementById("searchInput").addEventListener("keyup", async () => {
    if (SEARCHINPUT.value === "") {
      document.getElementById("browse-categories").classList.remove("d-none");
      document.getElementById("browse-results").classList.add("d-none");
    } else {
      // console.log("SEARCHINPUT => ", SEARCHINPUT.value.toLowerCase());
      await getSearch(SEARCHINPUT.value.toLowerCase());
      getArtist(SEARCHINPUT.value.toLowerCase());
      // console.log("SEARCHINPUT => album");
      // console.table(albums);
      // console.log("SEARCHINPUT => artist");
      // console.table(artists);
      document.getElementById("browse-categories").classList.add("d-none");
      const BROWSERESULT = document.getElementById("browse-results");
      BROWSERESULT.classList.remove("d-none");
      BROWSERESULT.innerHTML = `
  <div>
    <h2>Artista</h2>
    <div id="results-artist" class="d-flex">
    </div>
  </div>
  <div>
  <h2>Album</h2>
    <div id="results-album" class="d-flex">
    </div>
  </div>
  `;
      const DUPLICATI = [];
      for (let i = 0; i < albums.length; i++) {
        const ALBUM = albums[i];
        const ARTIST = artists[i];
        // console.log("duplicati => ", !DUPLICATI.includes(ALBUM.id));
        // console.log("duplicati => ", !DUPLICATI.includes(ARTIST.id));
        if (!DUPLICATI.includes(ALBUM.id)) {
          DUPLICATI.push(ALBUM.id);
          albumCard(
            "results-album",
            ALBUM.id,
            ARTIST.id,
            ALBUM.title,
            ARTIST.name,
            ALBUM.coverSmall,
            false
          );
        }
        if (!DUPLICATI.includes(ARTIST.id)) {
          DUPLICATI.push(ARTIST.id);
          artistCard(
            "results-artist",
            ARTIST.id,
            ARTIST.pictureSmall,
            ARTIST.name,
            null,
            false
          );
        }
      }
    }

    // for (let i = 0; i < artists.length; i++) {
    //   const ARTIST = artists[i];
    //   document.getElementById("results-artist").innerHTML += `
    //   <div>
    //     <img src="${ARTIST.pictureSmall}" class="rounded-circle" alt="...">
    //     <h5 class="card-title text-white">${ARTIST.name}</h5>
    //     <p>Artista</p>
    //   </div>
    //     `;
    // }
    // albums.forEach((ALBUM) => {
    //   document.getElementById("results-album").innerHTML = `
    //   <div>
    //     <img src="${ALBUM.coverSmall}" class="rounded-circle" alt="...">
    //     <a href="./album.html?id=${ALBUM.id}"><h5 class="card-title text-white">${ALBUM.title}</h5></a>
    //     <p>Album</p>
    //   </div>
    //     `;
    // });
  });
});
