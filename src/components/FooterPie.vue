<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="copyright">© 2026 Academia Grupo 5. Todos los derechos reservados.</p>
      <div class="team-section">
        <span class="team-label">Equipo de Desarrollo:</span>
        <p class="team-members">
          Chamba Jordy • Florez Yaniry • Loya Bryan • Parra Rensso • Pozo Kevin • Tapia Freddy • Trujillo Dennis
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #ffffff;
  border-top: 2px solid #4CAF50; 
  padding: 30px 20px;
  margin-top: auto; 
  font-family: 'Inter', sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: #7f8c8d;
}

.copyright {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 15px;
}

.footer-nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-nav a {
  color: #5d6d7e;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: #4CAF50; 
}

.team-section {
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
  margin-top: 15px;
}

.team-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #4CAF50; 
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team-members {
  font-size: 12px;
  line-height: 1.6;
  color: #95a5a6;
  max-width: 800px;
  margin: 0 auto;
}
</style>