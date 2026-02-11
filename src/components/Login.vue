<template>
  <div class="login-wrapper">
    <div class="container">
      <h2>Bienvenido</h2>
      <p class="subtitle">Inicia sesión en tu cuenta</p>
      <div class="login">
        <div class="input-group">
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" v-model="usuario" placeholder="Ingresa tu usuario" />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button @click="ingresar(usuario, password)">INGRESAR</button>
      </div>

      <div v-if="mensaje" class="error-message">
        {{ mensaje }}
      </div>
    </div>
  </div>
</template>

<script>
import { crearTokenFachada } from "@/clients/LoginClient";
export default {
  data() {
    return {
      usuario: "",
      password: "",
      mensaje: "",
    };
  },
  methods: {
    async ingresar(user, pass) {
      const token = await crearTokenFachada(user, pass);
      if (token != "") {
        localStorage.setItem("token", token);
        localStorage.setItem("estaAutenticado", true);
        this.$router.push({ name: "mostrarEstudiantes" });
        console.log("ESTA LOGUEADO");
      } else {
        this.mensaje = 'Usuario o Contraseña incorrectos';
        setTimeout(() => { this.mensaje = '';}, 4000);
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.container h2 {
  margin-bottom: 10px;
  color: #333;
  font-size: 26px;
  font-weight: bold;
}

.subtitle {
  margin-bottom: 25px;
  color: #666;
  font-size: 14px;
}

.login {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  text-align: left;
}

.login label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #444;
  font-size: 14px;
}

.login input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  color: #333;
  box-sizing: border-box;
}

.login input:focus {
  border-color: #4CAF50;
  outline: none;
}

.login button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.login button:hover {
  background-color: #45a049;
}

.error-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #fdecea;
  color: #d93025;
  border: 1px solid #fad2cf;
  border-radius: 4px;
  font-size: 14px;
}
</style>