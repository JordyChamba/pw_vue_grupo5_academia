<template>
  <div class="app-container">
    <nav v-if="!$route.meta.hideNavbar" class="navbar">
      <div class="nav-links">
        <router-link to="/mostrar/estudiantes">Estudiantes</router-link>
        <router-link to="/mostrar/cursos">Cursos</router-link>
        <router-link to="/mostrar/matricula">Matrícula</router-link>
      </div>
    </nav>
    
    <div class="main-content">
      <router-view/>
    </div>

    <FooterPie v-if="!$route.meta.hideNavbar"/>
  </div>
</template>

<script>
import FooterPie from './components/FooterPie.vue';

export default {
  components: {
    FooterPie
  }
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #a8a8a9;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1; 
  padding: 20px;
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
}

.navbar {
  background-color: #ffffff;
  padding: 0; 
  height: 70px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center; 
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid #4CAF50;
  width: 100%;
}

.nav-links {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 40px;
  width: 100%; 
  height: 100%;
}

.navbar a {
  font-weight: 600;
  color: #5d6d7e;
  text-decoration: none;
  font-size: 16px;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent; 
  border-radius: 0; 
}

.navbar a:hover {
  color: #4CAF50;
  background-color: #f9f9f9;
  border-bottom: 3px solid #4CAF50; 
}

.navbar a.router-link-exact-active {
  color: #4CAF50;
  background-color: transparent;
  border-bottom: 3px solid #4CAF50;
  font-weight: 700;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
