let BDUsuarios = [ {
    id: 50,
    nombre: "Sulaiman El Taha Santos",
    usuario: "Sulaiman",
    contraseña:"pepe123",
    gmail: "sulaiman@gmail.com",
  },
  {
    id: 51,
    nombre: "Sulaiman2 El Taha Santos",
    usuario: "Sulaiman2",
    contraseña:"pepe12345",
    gmail:"sula123@gmail.com",
  },
  {
    id: 55,
    nombre: "Abdelkader El Taha Santos",
    usuario: "Abudi",
    contraseña: "abudi98",
    gmail: "Abudieltahasan@gmail.com"
  }
  ]
  let usuarioSort = BDUsuarios
    BDUsuarios.sort((a, b) =>{
     if(a.nombre > b.nombre){
       return 0;
     }
     if (a.nombre < b.nombre) {
       return -1;
     }
     return 1;
     
    })
  function d (BDUsuarios){
    var rows = ""
  for(let i = 0;i<BDUsuarios.length;i++){
    rows = rows +`
    <tr>
                          <td class="text-left">${BDUsuarios[i].nombre}</td>
                          <td class="text-center">${BDUsuarios[i].gmail}</td>
                          <td class="text-center">${BDUsuarios[i].usuario}</td>
                          <td class="text-center">${BDUsuarios[i].contraseña}</td>
                          <td class="text-center"><button type="button" data-id1="${BDUsuarios[i].id}" class="btn btn-danger">Borrar</button>
                          </button>
                          </td>
                      </tr>`  
  
  }
  document.querySelector("#rows1").innerHTML=rows
  }
  d(BDUsuarios)
  
  document.querySelector("#tabla1").addEventListener("click", (p)=>{
      
    let id = parseInt(p.target.getAttribute("data-id1"))
    //confirm("Vas a borrar este producto " + BDUsuarios[id].usuario)
  
    let newBDUsuarios = BDUsuarios.filter(item => item.id !== id)
  
    console.log(newBDUsuarios) 
    BDUsuarios = newBDUsuarios
  
    d(BDUsuarios)
  });