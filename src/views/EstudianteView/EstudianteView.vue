<template>
  <div class="container">
    <div class="header-container">
      <div class="titles">
        <h1>Gestión de Estudiantes</h1>
        <p>Listado y registro de alumnos</p>
      </div>
      <button class="btncrea" v-show="bntCrear" @click="crear">+ Crear Estudiante</button>
    </div>
    <div class="componets">
      <div
        v-if="mensaje"
        :class="['mensaje-info', tipoMensaje]"
      >
        {{ mensaje }}
      </div>

      <TablaEstudiantes
        v-if="!mostrar"
        @editar="recibecodigo"
        @txt="recibeMensaje"
      />
      <br/>
      <FormEstudiante
        v-show="mostrar"
        :idBuscar="idBuscar"
        :guardar="guard"
        :visible="visi"
        @salir="mostrarComp"
        @txt="recibeMensaje"
      />
    </div>
  </div>
</template>


<script>
import TablaEstudiantes from "@/components/Estudiante/TablaEstudiantes.vue";
import FormEstudiante from "@/components/Estudiante/FormEstudiante.vue";

export default {
  components: {
    TablaEstudiantes,
    FormEstudiante,
  },
  data() {
    return {
      idBuscar: "",
      mostrar: false,
      mensaje: "",
      tipoMensaje: "",
      guard: false,
      visi: true,
      bntCrear: true,
    };
  },
  methods: {
    crear() {
      this.mostrar = true;
      this.guard = true;
      this.visi = false;
      this.bntCrear = false;
    },
    recibecodigo(id) {
      this.idBuscar = id;
      this.mostrar = true;
      this.visi = true;
      this.bntCrear = false;
    },
    mostrarComp() {
      this.mostrar = false;
      this.guard = false;
      this.idBuscar = "";
      this.bntCrear = true;
    },
    recibeMensaje(msj) {
      this.guard = false;

      if (msj == 1) {
        this.mensaje = "Se guardó con Éxito";
        this.tipoMensaje = "success";
        this.tiempo();
      }
      if (msj == 2) {
        this.mensaje = "Se Actualizó con Éxito";
        this.tipoMensaje = "success";
        this.tiempo();
      }
      if (msj == 3) {
        this.mensaje = "Registro eliminado";
        this.tipoMensaje = "success";
        this.tiempo();
      }
      if (msj == 4) {
        this.mensaje = "Registro no encontrado";
        this.tipoMensaje = "error";
        this.tiempo();
      }
    },
    tiempo() {
      setTimeout(() => {
        this.mensaje = "";
      }, 4000);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px auto;
  padding: 5px 25px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  width: 100%;
  box-sizing: border-box;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
  margin-top: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.titles h1 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
  text-align: left;
}

.titles p {
  font-size: 14px;
  color: #95a5a6;
  margin: 5px 0 0 0;
  text-align: left;
}

.btncrea {
  height: 40px;
  width: 150px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(76, 175, 80, 0.2);
}

.btncrea:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
}

.mensaje-info {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  width: 100%;
}

.mensaje-info.success {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.mensaje-info.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.mensaje-info.warning {
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}
</style>