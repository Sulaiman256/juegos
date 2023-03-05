var SUPABASE_URL ='https://hqrvipeczxkthmaeywym.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0'
var CDNURL = 'https://hqrvipeczxkthmaeywym.supabase.co/storage/v1/object/public/videos'
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
  <p>${data [0].gender.genero}</p>
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


// function ShowOrHideComments() {
//   var x = document.getElementById("comments-display");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }


const videoGames = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('video')
    .match({ producto_id: productoId })

  if (error) {
    console.log(error)
    return false
  }

  if (!data || data.length === 0) {
    return false
  }

  console.log(data)

  var videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <iframe  id="myVideo" width="560" height="315" src="${data[i].video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    `;
    videoContainer.appendChild(newDiv);
  }

  return newDiv;
}


function ShowOrHideComments() {
  var x = document.getElementById("comments-display");
  var videoContainer = document.getElementById("video-container");

  if (x.style.display === "none") {
    x.style.display = "block  ";
    videoContainer.innerHTML = ""; // elimina el video si se ocultan los comentarios
  } else {
    x.style.display = "none";
    videoGames().then(newDiv => {
      videoContainer.appendChild(newDiv);
    })
  }
}
  const fotoGames = async () => {
    const { data, error } = await supabase
      .from('fotos')
      .select('imagen')
      .match({ producto_id: productoId })

    if (error) {
      console.log(error)
      return false
    }

    if (!data || data.length === 0) {
      return false
    }

    console.log(data)

    var screenContainer = document.getElementById("screen-container");
    screenContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      var nuevoDiv = document.createElement("div");
      nuevoDiv.innerHTML = `
    
      <img width="300px" src="${data[i].imagen}">

      `
  
      console.log(nuevoDiv); // Agregamos esta línea de registro
      screenContainer.appendChild(nuevoDiv);
    }

    return screenContainer;
  }



  function ShowOrHideFotos() {
    var x = document.getElementById("comments-display");
    var screenContainer = document.getElementById("screen-container");

    if (x.style.display === "none") {
      x.style.display = "block";
      screenContainer.innerHTML = ""; // elimina el video si se ocultan los comentarios
    } else {
      x.style.display = "none";
      fotoGames().then(container => {
        screenContainer.appendChild(container);
      }).catch(error => {
        console.log(error);
      });
    }
  }


  const descriptionGames = async () => {
    const { data, error } = await supabase
      .from('descripciones')
      .select('descripcion')
      .match({ producto_id: productoId })

    if (error) {
      console.log(error)
      return false
    }

    if (!data || data.length === 0) {
      return false
    }

    console.log(data)

    var descriptionContainer = document.getElementById("description-container");
    descriptionContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      var divDescription = document.createElement("div");
      divDescription.innerHTML = `
    
      
      <p class="parrafo-justificado">${data[i].descripcion}</p>
      

      `
  
      console.log(divDescription); // Agregamos esta línea de registro
      descriptionContainer.appendChild(divDescription);
    }

    return descriptionContainer;
  }

  function ShowOrHideDescripcion() {
    var x = document.getElementById("comments-display");
    var descriptionContainer = document.getElementById("description-container");

    if (x.style.display === "none") {
      x.style.display = "block";
      descriptionContainer.innerHTML = ""; // elimina el video si se ocultan los comentarios
    } else {
      x.style.display = "none";
      descriptionGames().then(container => {
        descriptionContainer.appendChild(container);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  const gameContent = async () => {
    const { data, error } = await supabase
      .from('contenidos')
      .select('contenido')
      .match({ producto_id: productoId })

    if (error) {
      console.log(error)
      return false
    }

    if (!data || data.length === 0) {
      return false
    }

    console.log(data)

    var containContainer = document.getElementById("contain-container");
    containContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      var divContain = document.createElement("div");
      divContain.innerHTML = `
    
      
      <p class="parrafo-justificado">${data[i].contenido}</p>
      

      `
  
      console.log(divContain); // Agregamos esta línea de registro
      containContainer.appendChild(divContain);
    }

    return containContainer;
  }

  function ShowOrHideContain() {
    var x = document.getElementById("comments-display");
    var containContainer = document.getElementById("contain-container");

    if (x.style.display === "none") {
      x.style.display = "block";
      containContainer.innerHTML = ""; // elimina el video si se ocultan los comentarios
    } else {
      x.style.display = "none";
      gameContent().then(container => {
        containContainer.appendChild(container);
      }).catch(error => {
        console.log(error);
      });
    }
  }



































 