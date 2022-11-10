
window.onload = function () {


  
  document.getElementById('cargar').addEventListener('click', () => {


    let id = document.getElementById("id_anime").value
    let url = `https://api.jikan.moe/v4/anime/${id}/full`

    fetch(url)
      .then(response => response.json())
      .then(obj => {
        console.log(obj);
        
        if(obj.hasOwnProperty('status') && obj["status"] == 404) {

          document.getElementById('respuesta').innerHTML = `No existe un anime con el ID ${id}`
          document.getElementById("id_anime").value = ''
          document.getElementById("id_anime").focus()
          
        } else {
        // Inicio del procesamiento
          
          let data = obj['data']

          document.getElementById('respuesta').innerHTML = `
            <div class="card">
              <img src="${data.images.jpg.image_url}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.synopsis.slice(0,150)}...</p>
                <a href="${data.url}" class="btn btn-primary" target="_blank">Ir al sitio</a>
              </div>
            </div>
          `
          // Fin del procesamiento
        }
        
      })
      .catch(error => {
        document.getElementById('respuesta').innerHTML = JSON.stringify(error.message)
      })

  })

}