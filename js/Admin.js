let BD= [
    {
      id: 0,
      nombre: "Elden Ring",
      plataforma:"PS5",
      imagen: "eldenring.png",
      precio: "70"
    },
    {
      id: 1,
      nombre: "Demon's Souls",
      plataforma: "PS5",
      imagen: "demonsouls.png",
      precio: "72,5"
    },
    {
      id: 2,
      nombre: "Bloodborne Game of the Year Edition",
      plataforma: "PS4",
      imagen: "bloodborne.png",
      precio: "26,95"
    },
    {
      id: 3,
      nombre: "Spider-Man Game of the Year Edition",
      plataforma: "PS4",
      imagen: "spiderman.png",
      precio: "39.95",
    },
    { 
      id: 4, 
      nombre:"Horizon Forbidden West E.edition",
      plataforma: "PS5",
      imagen: "horizonps5.png",
      precio:"84,95"
    },
    {  
      id: 5,
      nombre:"Dark Souls Remastered",
      plataforma:"PS4",
      imagen: "ds1.png",
      precio:"26,95"
    },
    {  
      id: 6,
      nombre:"Call Of Duty Modern Warfare II",
      plataforma:"Xbox One/Xbox Series S/X",
      imagen: "codmw2nuevo.png",
      precio:"69,95"
    },
    {  
      id: 7,
      nombre:"Skyrim Anniversary Edition",
      plataforma:"Xbox One/Xbox Series S/X",
      imagen: "skyrimaniversaryedition.png",
      precio:"44,95"
    },
    {  
      id: 8,
      nombre:"Call Of Duty Vanguard",
      plataforma:"Xbox One/Xbox Series S/X",
      imagen: "callofdutyvanguard.png",
      precio:"64,95"
    },
    { 
      id: 9,
      nombre:"Metro Exodus Complete Edition",
      plataforma:"Xbox One/Xbox Series S/X",
      imagen: "metroexodus.png",
      precio:"34,95"
    },
    {  
      id: 10,
      nombre:"S.T.A.L.K.E.R 2 Heart of Chornobyl ",
      plataforma:"Xbox One/Xbox Series S/X",
      imagen: "stalker2xboxseries.png",
      precio:"54,95"
    },
    {  
      id: 11,
      nombre:"Borderlands 3 Súper Deluxe Edition",
      plataforma:"Xbox One/Xbox Series S/X",
      imagen: "bdls3.png",
      precio:"69,95"
    },
    {  
      id: 12,
      nombre:"Mario Kart 8 Deluxe",
      plataforma:"Switch",
      imagen: "mariokart8deluxe.png",
      precio:"49,95"
    },
    {  
      id: 13,
      nombre:"Super Mario Odyssey",
      plataforma:"Switch",
      imagen: "supermarioodissey.png",
      precio:"49,95"
    },
    {
      id: 14,
      nombre:"Pokémon Diamante Brillante",
      plataforma:"Switch",
      imagen: "pokemondiamantebrillante.png",
      precio:"49,95"
    },
    {
      id: 15,
      nombre:"Zelda Breath of the Wild",
      plataforma:"Switch",
      imagen: "zeldabreathofthewild.png",
      precio:"64,95"
    },
    { 
      id: 16,
      nombre:"Pokémon Púrpura",
      plataforma:"Switch",
      imagen: "pokemonpurpura.png",
      precio:"49,95"
    },
    {  
      id: 17,
      nombre:"Pokemon Escarlata",
      plataforma:"Switch",
      imagen: "pokemonescarlata.png",
      precio:"49,95"
    },
    {  
      id: 18,
      nombre:"Dead Space Remake",
      plataforma:"PC",
      imagen: "deadspaceremake.png",
      precio:"54,95"
    },
    { 
      id: 19,
      nombre:"SteelRising",
      plataforma:"PC",
      imagen: "steelrising.png",
      precio:"44,95"
    },
    { 
      id: 20,
      nombre:"Red Dead Redemption 2",
      plataforma:"PC",
      imagen: "rdr2.png",
      precio:"54,95"
    },
    { 
      id: 21, 
      nombre:"Battlefield 2042",
      plataforma:"PC",
      imagen: "bt2042.png",
      precio:"26,95"
    },
    {  
      id: 22,
      nombre:"FIFA 23",
      plataforma:"PC",
      imagen: "fifa23.png",
      precio:"59,95"
    },
    {  
      id: 23,
      nombre:"Mafia Trilogy Edition",
      plataforma:"PC",
      imagen: "mafiatrilogy.png",
      precio:"26,95"
    },
  ]


function displayHTML(BD){
   
    var rows = ""
    for(let x = 0;x<BD.length;x++){
      rows = rows +`
                    <tr >
                        <td class="text-left">${BD[x].nombre}</td>
                        <td class="text-center">${BD[x].plataforma}</td>
                        <td class="text-center">${BD[x].imagen}</td>
                        <td class="text-center">${BD[x].precio}</td>
                        <td class="text-center"><button type="button" data-id="${BD[x].id}" class="btn btn-danger">Borrar</button>
                        </button>
                        </td>
                        <td class="text-center"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="datosCampos(${BD[x].id})">Editar</button>  

                        </td>
                        

                    </tr>`   
    }
    document.querySelector("#rows").innerHTML=rows
  }

function orderItems(){

  BD.sort((a, b) =>{
   if(a.nombre > b.nombre){
     return 0;
   }
   if (a.nombre < b.nombre) {
     return -1;
   }
   return 1;
   
  })


  displayHTML(BD)
}

function removeItem(evento){
 
    
    let id = parseInt(evento.target.getAttribute("data-id"))

    let newBD = BD.filter(item => item.id !== id)

    BD = newBD

    displayHTML(BD)

  
}

function onSubmit (e){
  e.preventDefault()
  let name = document.getElementById("name").value
  let plataforma = document.getElementById("plataforma").value
  let imagen = document.getElementById("imagen").value
  let precio = document.getElementById("precio").value

  console.log(name)

  let product = {  
    id: 25,
    nombre:name,
    plataforma:plataforma,
    imagen:imagen,
    precio:precio
  }

 BD.push(product)
  displayHTML(BD)
}

function datosCampos(id){
  console.log(id)
  let juego = BD.find (item => item.id === id)  
  document.forms["editProducts"]['gameId'].value = juego.id
  document.forms["editProducts"]['nameEdit'].value = juego.nombre
  document.forms["editProducts"]['plataformaEdit'].value = juego.plataforma
  document.forms["editProducts"]['imagenEdit'].value = juego.imagen
  document.forms["editProducts"]['precioEdit'].value = juego.precio
  
}


function onSubmit2 (e){
  e.preventDefault()
  let nameEdit = document.getElementById("nameEdit").value
  let plataformaEdit = document.getElementById("plataformaEdit").value
  let imagenEdit = document.getElementById("imagenEdit").value
  let precioEdit = document.getElementById("precioEdit").value
  let gameId = document.getElementById("gameId").value

  let product = BD.find( item => item.id === parseInt(gameId))

  product.nombre = nameEdit
  product.plataforma = plataformaEdit
  product.imagen = imagenEdit
  product.precio = precioEdit

  mostrardatos()

 document.querySelector('#editForm').setAttribute('data-bs-dismiss', 'modal')

  


}
function mostrardatos(){
  
  var rows = ""
  for(let x = 0;x<BD.length;x++){
    rows = rows +`
                  <tr >
                      <td class="text-left">${BD[x].nombre}</td>
                      <td class="text-center">${BD[x].plataforma}</td>
                      <td class="text-center">${BD[x].imagen}</td>
                      <td class="text-center">${BD[x].precio}</td>
                      <td class="text-center"><button type="button" data-id="${BD[x].id}" class="btn btn-danger">Borrar</button>
                      </button>
                      </td>
                      <td class="text-center"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="datosCampos(${BD[x].id})">Editar</button>  

                      </td>
                      

                  </tr>`   
  }
  document.querySelector("#rows").innerHTML=rows
  
}


window.addEventListener('load', function() {
  orderItems()
});

document.querySelector("#tabla").addEventListener("click", (evento) => removeItem(evento)); //remove product

document.getElementById("frmproductos").addEventListener("click", onSubmit); //add products

document.getElementById("editProducts").addEventListener("click", onSubmit2); //edit products

















 



  






















  





  







    
  
  