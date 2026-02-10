<template>
  <div class="container">
    <h2>Login</h2>
    <div class="login">
      <label for="usuario">Usuario</label>
      <input type="text" id="usuario" v-model="usuario" placeholder="Usuario">

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" placeholder="Password">

      <button @click="ingresar()">Ingresar</button>
    </div>
  </div>
</template>

<script>
import {crearTokenFachada} from '@/clients/LoginClient'
export default {
  data(){
    return{
      usuario:'',
      password:'',
    }
  },
  methods:{
    async ingresar(){
      const token = await crearTokenFachada(this.usuario,this.password);
      if(token){
        localStorage.setItem('jwt', token.accessToken);
        localStorage.setItem('autenticado', true);
        this.$router.push('/mostrar/cursos');
      }
    }
  }
}
</script>

<style scoped>

.container {
  width: 100%;
  max-width: 300px;
  margin: 100px auto;
  padding: 35px;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

.container h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.login {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login label {
  text-align: left;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.login input {
  width:220px;       
  height: 35px;     
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box; 
}



.login input:focus {
  border-color: #6c63ff;
  box-shadow: 0 0 6px rgba(108,99,255,0.4);
  outline: none;
}

.login button {
  height: 35px;
  width: 225px;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.login button:hover {
  background: #574b90;
  transform: scale(1.03);
}
</style>