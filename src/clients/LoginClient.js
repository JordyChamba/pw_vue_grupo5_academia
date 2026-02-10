import axios from "axios";


// Devuelve el token como string. Ajusta la URL/credenciales si hace falta.
const crearToken = async (user, password) => {
  const url = `http://localhost:8082/auth/token?user=${user}&password=${password}`;
  const resp = await axios.get(url).then(r => r.data);
  console.log("token auth ",resp);
  return resp;
};

//fachada 
export const crearTokenFachada = async(user,password) =>{
  return await crearToken(user,password);
}






