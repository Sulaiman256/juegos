
var SUPABASE_URL ='https://hqrvipeczxkthmaeywym.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0'


var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
const url = new URL(window.location.href);
const productoId = url.searchParams.get("id");

const datosUsuarios = async () => { 
  const { data, error } = await supabase
  .from('usuarios')
  .select('*')
  

    if (error) {
      console.log(error)
      return false
  }
  
  if (data == null) {
      return false
  }
  data.sort((a,b)=> (a.nombre > b.nombre) ? 1 : -1);
  console.log(data)
  var rows1 = ""
  for(let x = 0;x<data.length;x++){
    rows1 = rows1 +`
                  <tr >
                      <td class="text-left">${data[x].name}</td>
                      <td class="text-center">${data[x].email}</td>
                      <td class="text-center">${data[x].password}</td>
                      <td class="text-center"><button type="button" id="delete-button" onclick="deleteUsuarios(${data[x].id})" class="btn btn-danger">Borrar</button>
                      </button>
                      </td>
                      <td class="text-center"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editar" onclick="datosCampos(${data[x].id})">Editar</button>  

                      </td>
                      

                  </tr>`   
  }
  document.querySelector("#rows1").innerHTML=rows1
}  
datosUsuarios()

async function deleteUser(id){
  const {error} = await supabase.from('usuarios')
   .delete() 
   .eq("id", id)
  if (error) {
    console.log(error)
    return
 }

 datosUsuarios()
 }
 function deleteUsuarios(id){
  const deleteButton = document.getElementById("delete-button");
 deleteButton.addEventListener("click", deleteUser(id))
  console.log(id)
}

deleteUser()







// let BDUsuarios = [ {
//     id: 50,
//     nombre: "Sulaiman El Taha Santos",
//     usuario: "Sulaiman",
//     contraseña:"pepe123",
//     gmail: "sulaiman@gmail.com",
//   },
//   {
//     id: 51,
//     nombre: "Sulaiman2 El Taha Santos",
//     usuario: "Sulaiman2",
//     contraseña:"pepe12345",
//     gmail:"sula123@gmail.com",
//   },
//   {
//     id: 55,
//     nombre: "Abdelkader El Taha Santos",
//     usuario: "Abudi",
//     contraseña: "abudi98",
//     gmail: "Abudieltahasan@gmail.com"
//   }
//   ]
//   let usuarioSort = BDUsuarios
//     BDUsuarios.sort((a, b) =>{
//      if(a.nombre > b.nombre){
//        return 0;
//      }
//      if (a.nombre < b.nombre) {
//        return -1;
//      }
//      return 1;
     
//     })
//   function d (BDUsuarios){
//     var rows = ""
//   for(let i = 0;i<BDUsuarios.length;i++){
//     rows = rows +`
//     <tr>
//                           <td class="text-left">${BDUsuarios[i].nombre}</td>
//                           <td class="text-center">${BDUsuarios[i].gmail}</td>
//                           <td class="text-center">${BDUsuarios[i].usuario}</td>
//                           <td class="text-center">${BDUsuarios[i].contraseña}</td>
//                           <td class="text-center"><button type="button" data-id1="${BDUsuarios[i].id}" class="btn btn-danger">Borrar</button>
//                           </button>
//                           </td>
//                       </tr>`  
  
//   }
//   document.querySelector("#rows1").innerHTML=rows
//   }
//   d(BDUsuarios)
  
//   document.querySelector("#tabla1").addEventListener("click", (p)=>{
      
//     let id = parseInt(p.target.getAttribute("data-id1"))
//     //confirm("Vas a borrar este producto " + BDUsuarios[id].usuario)
  
//     let newBDUsuarios = BDUsuarios.filter(item => item.id !== id)
  
//     console.log(newBDUsuarios) 
//     BDUsuarios = newBDUsuarios
  
//     d(BDUsuarios)
//   });