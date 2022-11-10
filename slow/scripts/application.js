//const URL = 'https://inshorts.deta.dev/news?category=science'
const URL = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100'

let peticion = async (event) => {

	console.time('Tiempo de ejecución del fetch')

	// Bloque de petición - Inicio
/*
	document.getElementById("respuesta").innerHTML = ''

	let respuesta = await fetch(URL, { cache: 'no-cache' });
	let obj = await respuesta.json()

	document.getElementById("respuesta").innerHTML = obj.data.length + ' registros';
*/
document.getElementById("respuesta").innerHTML = ''

let respuesta = await fetch(URL);

const reader = respuesta.body.getReader();

document.getElementById('respuesta').innerHTML = '0%'

// Paso 2: obtener el total de la respuesta
let contentLength = +respuesta.headers.get('content-length');



// Paso 3: leer la data
let receivedLength = 0; // bytes recibidos en este momento
let chunks = []; // arreglo de fragmentos binarios recibidos (conforman el cuerpo) 
while(true) {
   const {done, value} = await reader.read();

   if (done) {
     break;
   }

   chunks.push(value);
   receivedLength += value.length;

   let percentage = ((receivedLength / contentLength) * 10).toFixed(2);

   document.getElementById('respuesta').innerHTML = `${percentage}%`

}

// Paso 4: concatenar los framgento en un único Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
   chunksAll.set(chunk, position); // (4.2)
   position += chunk.length;
}

// Paso 5: decodificar en una cadena
let result = new TextDecoder("utf-8").decode(chunksAll);

// Listo!
let obj = JSON.parse(result);
document.getElementById("respuesta").innerHTML = obj.length + ' registros (100%)';
	// Bloque de petición - Fin

	console.timeEnd('Tiempo de ejecución del fetch')
	 
}

window.onload = function () {
  

  document.getElementById('cargar').addEventListener('click', peticion )
  

}