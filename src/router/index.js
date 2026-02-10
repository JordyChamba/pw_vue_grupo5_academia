import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TablaCursosView from '@/views/CursoView/TablaCursosView.vue'
import EstudianteView from '@/views/EstudianteView/EstudianteView.vue'

const routes = [

  {
    path: '/',
   redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      hideNavbar: true,
    }
  },

  {
    path: '/mostrar/cursos',
    name: 'mostrarCursos',
    component: TablaCursosView,
    meta: {
      requiereautorizacion: true,
      esPublica: false
    }
  },
  {
    path: '/mostrar/estudiantes',
    name: 'mostrarEstudiantes',
    component: EstudianteView,
    meta: {
      requiereautorizacion: true,
      esPublica: false
    }
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiereautorizacion){
    //le envio a una pag de login
    const autenticado = localStorage.getItem("autenticado");

    if(!autenticado )
    {
    console.log("Redirigiendo a login");
    next({name: 'login'})
    }else{
      next();
    }
    
  }else{
    //pasa sin validacion
    console.log("Pase libre");
    next();
  }
} )

export default router
