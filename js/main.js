var SUPABASE_URL ='https://hqrvipeczxkthmaeywym.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  const gamesBD = async () => { 
    const { data, error } = await supabase
    .from('productos')
    .select('*, platforms(plataforma)')
    if (error) {
      console.log(error)
      return false
  }

  if (data == null) {
      return false
  }

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

if (data == null) {
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

  document.querySelector("#Fichas").innerHTML= fichas
   
  }
}














  





  
 



