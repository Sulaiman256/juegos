var SUPABASE_URL ='https://hqrvipeczxkthmaeywym.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

window.addEventListener('load', async() => {
    if (await supabase.auth.getUser()) {
        const { data: { user } } = await supabase.auth.getUser()

        console.log( user)
        
    }
   

 });
 

 const checkUserExists = async(email, password) => {
    const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .match({email: email, password: password })
    .maybeSingle()

    if (error) {
        console.log(error)
        return false
    }

    if (data == null) {
        return false
    }

    return data
 }


 const handleLogin = (userExist) => {
    console.log(userExist)
   if (userExist === false) {
        alert('El email o la contrasena no existe. Si no tienes cuenta, registrate!')
         return
    }

    sessionStorage.setItem('user', JSON.stringify(userExist))
    window.location.href= './Paginajuegos.html'
    
 }

async function datos(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const userExist = await checkUserExists(email, password)

    handleLogin(userExist)
  
}



  

// supabase.auth.providers.google().then((Response)=>{
//     console.log(Response)
// })
// async function loginWithGoogle(){
//     const {user, session, error} = await supabase.auth.signIn({
//         provider: 'google'
//     })
// }

// async function logout(){
//     const {error} = await supabase.auth.signOut()
// }

const loginWithGoogle = async() => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://127.0.0.1:5500/html/Paginajuegos.html'
        }
      })

      console.log(error, data)
}

document.getElementById('logGoogle').addEventListener('click', loginWithGoogle)

