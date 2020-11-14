//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
  //Cuando agregas un curso al carrito presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso)


  //Muestra los cursos del LocalStorage
  document.addEventListener("DOMContentLoaded", () =>{
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoHTML()
  } )


  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso)

  vaciarCarritoBtn.addEventListener("click", () =>{
    console.log("Vaciando carrito")
    articulosCarrito = []
    limpiarHTML(); //Eliminamos todo el html
  })
}

//Funciones

function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains("agregar-carrito")){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
}

//Elimna un curso del carrito
function eliminarCurso(e){
  if(e.target.classList.contains("borrar-curso")){
    const cursoId = e.target.getAttribute("data-id");
    //Elimina del arreglo según el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
    console.log(articulosCarrito)

    carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
  }
}

//Lee el contenido del html al que le dimos click y extrae la información del curso

function leerDatosCursos(curso){
  /* console.log(curso); */

  //crear un objeto con el contenido del curso 
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1
  }

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id  );
  if(existe) {
      // Actualizamos la cantidad
      const cursos = articulosCarrito.map( curso => {
          if( curso.id === infoCurso.id ) {
              curso.cantidad++;
              return curso; // retorna el objeto actualizado
          } else {
              return curso; // retorna los objetos que no son los duplicados
          }
      } );
      articulosCarrito = [...cursos];
  } else {
      // Agrega elementos al arreglo de carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
  }


  console.log(articulosCarrito)
  carritoHTML();
}





//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();


    //Recorre el carrito y genera el HTML
  articulosCarrito.forEach( (curso) =>{
    //Aplicar destructuring
    const {imagen, titulo,  precio, cantidad, id} = curso;
    console.log(curso);
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <img src="${imagen}" width= 100px>
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
      <a href="#" class="borrar-curso" data-id=${id}> x </a>
    </td>
    `;

    //Agrega el HTML del carrito en el tBody
    contenedorCarrito.appendChild(row)
  })

  //Agregar el carrito de compras al storage
  sincronizarStorage()

}

function sincronizarStorage(){
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}



//Elimina los cursos del tbdoy
function limpiarHTML(){
  //Forma Lenta
  /* contenedorCarrito.innerHTML = " " */
  
  
  //Mejor forma de limpiar html
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  } 
}

