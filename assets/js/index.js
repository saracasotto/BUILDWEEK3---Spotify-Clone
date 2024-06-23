document.addEventListener("DOMContentLoaded", async () => {
  await asideArtist();
  albumCards();
  albumClick();
});

// Function to generate and display album cards
async function albumCards() {
  for (const [i, ALBUM] of albums.entries()) {
    const CARDSCONTAINER = document.getElementById(`cardsContainer${i % 4}`);
    const ARTIST = artists[i];
    CARDSCONTAINER.innerHTML += `
      <div class="card">
        <div class="card-img-container">
    			<a href="#"id="albumCard${i+1}" data-idalbum="${ALBUM.id}" data-idartist="${ARTIST.id}" onclick="albumClick(this)">
            <img src="${ALBUM.coverMedium}" class="card-img-top" alt="ALBUM IMG">
          </a>
          <a href="#">
            <img src="assets/images/playbutton.svg" class="overlay-player-btn">
          </a>
    		</div>
    		<div class="card-body">
    			<a href="./album.html?id=${ALBUM.id}">
    			  <h5 class="card-title">${ALBUM.title}</h5>
    			</a>
    			<a href="./artist.html?id=${ARTIST.id}">
    			  <p class="card-text">${ARTIST.name}</p>
    			</a>
    		</div>
    `;
    if (i === 15) break;
  }
}

