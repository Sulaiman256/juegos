var SUPABASE_URL ='https://hqrvipeczxkthmaeywym.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0'

const url = new URL(window.location.href);
const productoId = url.searchParams.get("id");
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

window.addEventListener("load", () => {
  datosjuegos()
  fetchComments()
  
if (productoId === null) {
  window.location.href = "http://127.0.0.1:5500/html/Paginajuegos.html"
}
});

const datosjuegos = async () => { 
  const { data, error } = await supabase
  .from('productos')
  .select('*, gender(genero) , dev(developer), fabricante(maker), platforms(plataforma)')
  .match({id: productoId})
  if (error) {
    console.log(error)
    return false
}

if (data == null) {
    return false
}

console.log(data)
  let datosJuegos = `
  <div class="col-md-6">
  <p>${data[0].gender.genero}</p>
  <p>${data[0].dev.developer}</p>
  <p>${data[0].fabricante.maker}</p>
</div>

  `
  let precio  = `
  <p id="precioId" class="pt-3">${data[0].precio}</p>
  
  `
  let nameplataform  = `
  <div class="sticky-title sticky-content text-center pt-5">
          <h5 id="Plataforma">${data[0].platforms.plataforma}</h5>
        </div>
  `
  let nameproduct  = `
        <h4 id="nameId">${data[0].nombre}</h4>
  `
  document.querySelector('#nameId').innerHTML= nameproduct;

  document.querySelector('#plataformaId').innerHTML= nameplataform;
  
  document.querySelector('#precioId').innerHTML= precio;
  console
 
  // Set atributte con esto cogeremos el atributo que queremos y luego usamos con los datos que tenemos en la base de datos
document.querySelector('#imagenProducto').setAttribute("src", data[0].imagen);
console.log(document.querySelector('#imagenProducto').getAttribute("src"))
console.log(data)


document.querySelector("#datosjuegos").innerHTML= datosJuegos
}

const datoscomentarios = async (comentarios) => {
  const { data, error } = await supabase
  .from("*, comentarios")
  .select('*, comentarios(userId, productId)')
  .match({comentarios:comentarios})
  if (error) {
    console.log(error)
    return false
}

if (data == null) {
    return false
}
let resultscomments = `
<div class="row " id="display-comments">
<div>
${data[0].comentarios}
</div>
</div>
  
  `
document.querySelector("#display-comments").innerHTML = resultscomments
}

/**
 * 1. Carga de todos los comentarios de la base de datos.
 * 2. InnerHTML con cada uno de los comentarios
 * 3. Introducir un comentario del usuario x desde el formulario
 * 4. Validar que se ha introducido en la base de datos
 * 5. Insertar en el array inicial una nueva posicion con el nuevo comentario
 * 6. Cargar todo el array de nuevo o hacer que cargue una porcion
 */



const commentForm = document.getElementById("comment-form")

commentForm.addEventListener("submit", e =>{
 e.preventDefault()
 console.log("este es el producto id ",productoId);
 const comentarios = document.getElementById("comment-content").value;
    supabase
      .from('comments')
      .insert({comentarios:comentarios, productId:productoId })
      .then((Response)=>{
        console.log("comentario insertado correctamente", Response)
        fetchComments()
      })
      .catch((error)=>{
        console.error("error al insertar comentario", error)
      })
  


})


const fetchComments = async() => {

    const {data, error} = await supabase.from('comments').select('*').eq('productId', productoId)

    if (error) {
      console.log(error.message)
      return
    }

   if (data.length === 0) {
    document.querySelector('#display-comments').innerHTML= "no hay comentarios"
      return
   }
   console.log(data)
   
   var comentariosdates = ""

   for(let i = 0;i<data.length;i++){
     comentariosdates = comentariosdates +`
     <div>
     ${data[i].comentarios}
     </div>
    </div>
     `
   }
   document.querySelector("#display-comments").innerHTML= comentariosdates
   document.querySelector('#comment-content').value= ""
}
 

// const displayComments = (array) => {
  
//   array.forEach(comment => {
//     const divComments = document.querySelector('#display-comments')
//     const newDiv = divComments.appendChild(document.createElement('div'))
//      newDiv.textContent = comment.comentarios
//     console.log(comment)
//   })
  
// }



// displayComments(data)

  
  

  //   const commentForm = document.getElementById("comment-form")
  //  commentForm.addEventListener("submit", e =>{
  //    e.preventDefault()
  //    const commentContent = document.getElementById("comment-content").value;
  //   //const commentAuthor = document.getElementById("comment-author").value;
  
  //   const divComments = document.querySelector('#display-comments')
  //   const newDiv = divComments.appendChild(document.createElement('div'))
  //   newDiv.textContent = commentContent

  //  })
   


  