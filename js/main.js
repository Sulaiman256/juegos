
// Definir las variables de Supabase y crear la instancia
var SUPABASE_URL = 'https://hqrvipeczxkthmaeywym.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0';

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  const gamesBD = async () => { 
    const { data, error } = await supabase
    .from('productos')
    .select(`
      imagen, platforms(plataforma)`)

  console.log(data)

  var fichas = ""

  for(let x = 0;x<data.length;x++){
    fichas = fichas +`
    <!-- card -->
    <div class="col-md-3 mt-5">
      <div class="card tarjeta">
        <img src="${data[x].imagen}" class="card-img-top card-image" alt="...">
        <div class="card-body">
          <h6 class="card-title ">${data[x].nombre}</h6>
          <p class="card-text">${data[x].platforms.plataforma}</p>
          <a href= ${'../html/fichaProducto.html?id=' + data[x].id} class="btn btn-primary">${data[x].precio}</a>
        </div>
      </div>
    </div>
    `
  }
  
  
  document.querySelector("#Fichas").innerHTML= fichas
}

gamesBD()




const fetchSearch = async(keyword) =>{
  const { error, data } = await supabase
  .from('productos')
  .select('*, platforms(plataforma)')
  .ilike('nombre', `%${keyword}%`)
  if (error) {
    console.log(error)
    return false
  }

  if (!data || data.length === 0) {
    return false
  }
  return data
}

const handlebuscar = (gameExist) => {
  console.log(gameExist)
 if (gameExist === false) {
       return
  }
}

//Cuando se clique el boton enter en el input del buscador debe ejecutar la funcion capturarValoresBuscador

const searchField = document.getElementById("buscador");

searchField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    capturarValoresBuscador();
  }
})

async function capturarValoresBuscador(){
  let buscador =  document.querySelector('#buscador').value;
  const gameExist = await fetchSearch(buscador)
  let fichas = ''
  for (let i = 0; i< gameExist.length; i++){
    fichas += ` 
      <div class="col-md-3 mt-5">
        <div class="card tarjeta">
          <img src="${gameExist[i].imagen}" class="card-img-top card-image" alt="...">
          <div class="card-body">
            <h6 class="card-title ">${gameExist[i].nombre}</h6>
            <p class="card-text">${gameExist[i].platforms.plataforma}</p>
            <a href= ${'../html/fichaProducto.html?id=' + gameExist[i].id} class="btn btn-primary">${gameExist[i].precio}</a>
          </div>
        </div>
      </div>
    `;
  }
  if (fichas === '') {
    document.querySelector("#Fichas").innerHTML = 'No se encontraron resultados para esta búsqueda'
  } else {
    document.querySelector("#Fichas").innerHTML = fichas
  }
}

const logoutButton = document.querySelector('.btn-danger');

// Agregar un event listener para el botón de cerrar sesión
logoutButton.addEventListener('click', () => {
  // Cerrar sesión en Supabase
  supabase.auth.signOut().then(() => {
    // Imprimir mensaje en la consola si se cierra sesión con éxito
    console.log('El usuario ha cerrado sesión con éxito');
    // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
    window.location.href = "../html/InicioDeSesion.html"; // Reemplaza 'login.html' con la URL de tu página de inicio de sesión
  }).catch(error => {
    // Imprimir cualquier error que ocurra al cerrar sesión
    console.log(error);
  });
});

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
    document.querySelector("#nameEdit").value = user.user_metadata.name || '';
    document.querySelector("#passwordEdit").value = user.user_metadata.password
    document.querySelector("#emailEdit").value = user.user_metadata.email
  } else if (event === 'SIGNED_OUT') {
    // El usuario ha cerrado sesión correctamente
    console.log('El usuario ha cerrado sesión con éxito');
  }
});

const saveButton = document.querySelector('#EditUsers');

// Agregar un event listener para el botón de guardar
saveButton.addEventListener('click', async () => {
  // Actualizar los datos del usuario en Supabase
  const { data, error } = await supabase.auth.updateUser({
    email: document.querySelector("#emailEdit").value, 
    password: document.querySelector("#passwordEdit").value,
    data: { name: document.querySelector("#nameEdit").value }
  });

  if (error) {
    // Imprimir cualquier error que ocurra al actualizar los datos del usuario
    console.error(error);
  } else {
    // Imprimir los datos actualizados del usuario
    console.log(data);

    // Redirigir al usuario a la página de inicio después de actualizar los datos
    window.location.href = "../html/Paginajuegos.html"; // Reemplaza 'Inicio.html' con la URL de tu página de inicio
  }
});





    
      
      
   
        










  





  
 



