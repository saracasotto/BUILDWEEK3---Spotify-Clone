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
    nFan: data["nb_fan"],
  };
  // console.log("GETARTIST => artist\n", artist);
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