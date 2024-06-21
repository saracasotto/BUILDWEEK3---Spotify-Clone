document.addEventListener("DOMContentLoaded", async()=>{
  
  await asideArtist()
  await albumClick()
  displayArtist()
    
  }) 

  const params = new URLSearchParams(location.search)

let id = params.get('idartist')

params.set('id', id);

// console.log(params.toString());

function displayArtist() {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + id, {

    })
        .then(response => {
            // console.log(response)
            response.json()
            .then(data => {
                console.log(data);
                
                let mostraArtista = document.getElementById('artist')
                mostraArtista.innerHTML = 
                `
                        <div class="card col-12">
                            <img src="${data.picture_big}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>

                                <p class="card-text">${data.id}</p>


                            </div>
                        </div>
                `
            })
        })
        .catch(error => {
            console.log('Errore nella richiesta fetch:', error);
        });
}