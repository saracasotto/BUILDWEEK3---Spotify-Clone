const URLSEARCH = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const URLARTIST = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const URLALBUM = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let searchs = null;
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
  // console.log("ASIDEARTIST => album");
  // console.table(album);
  // console.log("ASIDEARTIST => artist");
  // console.table(artist);
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

async function songCard(idAlbum, idArtist, albumTitle, artistName, cover) {
  document.getElementById("song-card").innerHTML = `
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
}

async function artistCard(idArtist, picture, artistName, idAlbum, artistFan) {
  document.getElementById("artist-card").innerHTML = `
  <div class="card-img-container">
      <a href="./artist.html?=${idArtist}"><img src="${picture}" class="card-img-top" alt="ALBUM IMG"></a>
    </div>
    <div class="card-body">
      <a href="./artist.html?=${idArtist}">
        <h5 class="card-title">${artistName}</h5>
      </a>
      <a href="./album.html?id=${idAlbum}">
        <p class="card-text">${artistName}</p>
        <p class="card-text">${artistFan} listeners</p>
      </a>
      <div class="card-button-overlay">
        <button class="btn">Follow</button>
      </div>
    </div>
  `;
}

async function albumClick(albumCard) {
  let idAlbum = localStorage.getItem("idAlbum");
  let idArtist = localStorage.getItem("idArtist");
  console.log("ALBUMCLICK => idAlbum\n", idAlbum,idArtist);
  if (albumCard === undefined || (idAlbum === null && idArtist === null)) {
    console.log("ALBUMCLICK => ids\n", albums[0].id, artists[0].id);
    localStorage.setItem("idAlbum", albums[0].id);
    localStorage.setItem("idArtist", artists[0].id);
    await getArtist(artists[0].id);
    console.log("ALBUMCLICK => artists\n", artists);
  } else {
    localStorage.setItem("idAlbum", albumCard.dataset.idalbum);
    localStorage.setItem("idArtist", albumCard.dataset.idartist);
    await getArtist(albumCard.dataset.idartist);
    console.log("ALBUMCLICK => artists\n", artists);
  }
  for (let i = 0; i < albums.length; i++) {
    const ALBUM = albums[i];
    if (ALBUM.id === idAlbum) {
      collapsedTitle(ALBUM.title);
      songCard(
        ALBUM.id,
        artists.id,
        ALBUM.title,
        artists.name,
        ALBUM.coverMedium
      );
      artistCard(
        ALBUM.id,
        artists.pictureMedium,
        artists.name,
        ALBUM.id,
        artists.nFan
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