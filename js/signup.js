var SUPABASE_URL ='https://hqrvipeczxkthmaeywym.supabase.co'
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcnZpcGVjenhrdGhtYWV5d3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMTE2NTgsImV4cCI6MTk4Nzg4NzY1OH0.hF4y8SHqqGttHJW7PXRY51mna3xubSPB-OKbGOV1JB0'
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)


const toast = () => {
  const toastLiveExample = document.getElementById('liveToast')
  const toast = new bootstrap.Toast(toastLiveExample)
  toast.show()
}

const signUp = async(name, email, password) => {
    const { error } = await supabase
  .from('usuarios')
  .insert({name:name, email:email, password:password})
  
  if (error) {
    console.log(error)
    return false
  }

  return true
  
}
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



const handleregister = async(userExists, name, email, password) => {
  console.log(userExists)
  if( userExists === false){

    const signup = await signUp(name, email, password)


    if (signup === true) {   //alert alert-success
      document.querySelector('.toast-body').innerHTML = '<div class="alert alert-success">Cuenta creada!!!</div>'
      return
    }
    
    document.querySelector('.toast-body').innerHTML =  '<div class="alert alert-danger">No ha sido posible crearse!!!</div>'

    return
    
  }

  document.querySelector('.toast-body').innerHTML = '<div class="alert alert-danger">Los datos ya estan registrados!!!</div>'
   
} 



async function register(e){
  e.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    const userExists = await checkUserExists(email, password)

    await handleregister(userExists, name, email, password)
    toast()
    
}











