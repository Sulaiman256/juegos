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



const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit", async e => {
  e.preventDefault();
  console.log("este es el producto id ",productoId);
  const currentDate = new Date(); //fecha actual
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const parseCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const comentarios = document.getElementById("comment-content").value;
  const session = await supabase.auth.getSession();
  if (!session || session.provider !== 'google') {
    alert('Debes iniciar sesión con Google para dejar un comentario.');
    return;
  }
  const user_Id = session.data.session.user.id;
  supabase
    .from('comments')
    .insert({ comentarios, productId:productoId, date:parseCurrentDate, user_Id:user_Id})
    .then((Response)=>{
      console.log("comentario insertado correctamente", Response);
      fetchComments();
    })
    .catch((error)=>{
      console.error("error al insertar comentario", error);
    })
    console.log(user_Id);
    console.log(session.data.session.user.email)
});



// session.data.session.user.id



const fetchComments = async () => {
  const { data: commentsData, error: commentsError } = await supabase
    .from('comments')
    .select('*, usuarios(name)')
    .eq('productId', productoId)
    .order('id', { ascending: false });

  if (commentsError) {
    console.log(commentsError.message);
    return;
  }

  if (commentsData.length === 0) {
    document.querySelector('#display-comments').innerHTML = 'No hay comentarios';
    return;
  }

  var comentariosdates = '';
  for (let i = 0; i < commentsData.length; i++){
    const comment = commentsData[i];
    const usuario = comment.usuarios;
    const usuarioNombre = usuario ? usuario.name : '';
    const user_Id = comment.user_Id;
    comentariosdates += `
      <div class="comentario-info">
        <img src="../images/imagenUsuario.png" width="35px">
        <strong class="user">${user_Id || usuarioNombre}</strong>
        <p class="fecha">${new Date(comment.date).toLocaleDateString()}</p>
      </div>
      <div>
        <p class="texto">${comment.comentarios}</p>
      </div>
    `
  }

  document.querySelector('#display-comments').innerHTML = comentariosdates;
  document.querySelector('#comment-content').value = '';
}





// session.data.session.user.id

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // El usuario ha iniciado sesión correctamente
    console.log('El usuario ha iniciado sesión con éxito');
    const user = session.user; // Obtener el objeto de usuario
    console.log(user.id); // Mostrar el ID del usuario
    console.log(user.email); // Mostrar el correo electrónico del usuario
    console.log(user.user_metadata); // Mostrar cualquier metadato adicional del usuario
    console.log(user.user_metadata.name)
    console.log(user.user_metadata.email)
  } else if (event === 'SIGNED_OUT') {
    // El usuario ha cerrado sesión correctamente
    console.log('El usuario ha cerrado sesión con éxito');
  }
});

// const user_Id = data[i].user_Id;


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

  






























 