const URL = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100'

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms))


let sobrecargar = (event) => {

	let iterador = [...Array(500).keys()]

	Array.from(iterador).forEach( async (it) => {

		let respuesta = await fetch(URL);
		let obj = await respuesta.json()

		if(obj.hasOwnProperty('message')) {
			document.getElementById("respuesta").innerHTML += `Petición ${it} ${obj.message} <br>`
		} else {
			document.getElementById("respuesta").innerHTML += `Cantidad de elementos: ${obj.length} <br>`
		}

		await esperar(1)
		
	})
	
}

window.onload = function () {
  
  document.getElementById('cargar').addEventListener('click', sobrecargar )


}