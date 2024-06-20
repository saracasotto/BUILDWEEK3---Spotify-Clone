document.addEventListener("DOMContentLoaded", async () => {
  await asideArtist();
  await albumCards();
});

async function albumCards() {
  let y = 0;
  for (let x = 0; x < 4; x++) {
    const CARDSCONTAINER = document.getElementById(`cardsContainer${x + 1}`);
    for (y; y < 16; y++) {
      const ALBUM = albums[y];
      const ARTIST = artists[y];
      CARDSCONTAINER.innerHTML += `
  <div id="albumCard${y}" data-idalbum="${ALBUM.id}" data-idartist="${ARTIST.id}" class="card" onclick="albumClick(this)">
    <div class="card-img-container">
			<a href="#"><img src="${ALBUM.coverMedium}" class="card-img-top" alt="ALBUM IMG"></a>
		</div>
		<div class="card-body">
			<a href="./album.html?idalbum=${ALBUM.id}&idartist=${ARTIST.id}">
			  <h5 class="card-title">${ALBUM.title}</h5>
			</a>
			<a href="./album.html?idalbum=${ALBUM.id}&idartist=${ARTIST.id}">
			  <p class="card-text">${ARTIST.name}</p>
			</a>
		</div>
`;
    }
  }
}


