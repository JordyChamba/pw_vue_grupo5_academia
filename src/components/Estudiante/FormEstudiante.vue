<template>
  <div class="container">
    <h3>Datos Estudiante</h3>
    <form action="">
      <div class="datos">
        <label for="cedula">Cédula:</label>
        <span class="error-msg" v-if="validar && !estudiante.cedula">{{
          requerido
        }}</span>
        <input
          type="number"
          id="cedula"
          v-model="estudiante.cedula"
          placeholder="Ingrese la cédula"
        />
        <label for="nombre">Nombre:</label>
        <span class="error-msg" v-if="validar && !estudiante.nombre">{{
          requerido
        }}</span>
        <input
          type="text"
          id="nombre"
          v-model="estudiante.nombre"
          placeholder="Ingrese el nombre"
        />
        <label for="apellido">Apellido:</label>
        <span class="error-msg" v-if="validar && !estudiante.apellido">{{
          requerido
        }}</span>
        <input
          type="text"
          id="apellido"
          v-model="estudiante.apellido"
          placeholder="Ingrese el apellido"
        />
        <label for="carrera">Carrera:</label>
        <span class="error-msg" v-if="validar && !estudiante.carrera">{{
          requerido
        }}</span>
        <input
          type="text"
          id="carrera"
          v-model="estudiante.carrera"
          placeholder="Ingrese la carrera"
        />

        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <span class="error-msg" v-if="validar && !estudiante.fechaNacimiento">{{
          requerido
        }}</span>
        <input
          type="date"
          id="fechaNacimiento"
          v-model="estudiante.fechaNacimiento"
        />
        <label for="telefono">Teléfono:</label>
        <span class="error-msg" v-if="validar && !estudiante.telefono">{{
          requerido
        }}</span>
        <input
          type="text"
          id="telefono"
          v-model="estudiante.telefono"
          placeholder="Ingrese el teléfono"
        />
      </div>
      <div class="botones">
        <button
          type="submit"
          v-show="guardar"
          @click.prevent="guardarEstudiante"
        >
          Guardar
        </button>
        <button type="submit" v-show="visible" @click.prevent="actualizar">
          Actualizar
        </button>
        <button @click.prevent="cancelar">Cancelar</button>
      </div>
      <h3>{{ mensaje }}</h3>
    </form>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  mostrarPorIdFachada,
} from "@/clients/EstudianteClient";

export default {
  props: {
    idBuscar: {
      type: [Number, String],
      default: "",
    },
    guardar: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      estudiante: {
        id: "",
        cedula: "",
        nombre: "",
        apellido: "",
        carrera: "",
        fechaNacimiento: "",
        telefono: "",
      },
      mensaje: "",
      requerido: "Este campo es requerido",
      validar: false,
    };
  },
  watch: {
    idBuscar: {
      handler(newVal) {
        if (newVal) {
          this.consultarPorId(newVal);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async consultarPorId(id) {
      const resp = await mostrarPorIdFachada(id);
      this.estudiante = resp;
    },
    async guardarEstudiante() {
      try {
        this.validar = true;
        if (this.formularioValido) {
          this.estudiante.id = null;
          console.log("Enviando estudiante:", JSON.stringify(this.estudiante));
          await guardarFachada(this.estudiante);
          this.$emit("salir");
          this.$emit("txt", 1);
          this.limpiar();
        }
      } catch (error) {
        this.mensaje = "No se guardó";
        this.tiempo();
      }
    },
    async actualizar() {
      try {
        await actualizarFachada(this.estudiante.id, this.estudiante);
        this.$emit("salir");
        this.$emit("txt", 2);
        this.limpiar();
      } catch (error) {
        this.mensaje = "No se actualizó";
        this.tiempo();
      }
    },
    cancelar() {
      this.$emit("salir");
      this.limpiar();
    },
    limpiar() {
      this.validar = false;
      this.estudiante = {
        id: "",
        cedula: "",
        nombre: "",
        apellido: "",
        carrera: "",
        fechaNacimiento: "",
        telefono: "",
      };
    },
    tiempo() {
      setTimeout(() => {
        this.mensaje = "";
      }, 4000);
    },
  },
  computed: {
    formularioValido() {
      return (
        this.estudiante.cedula &&
        this.estudiante.nombre &&
        this.estudiante.nombre.trim() !== "" &&
        this.estudiante.apellido &&
        this.estudiante.apellido.trim() !== "" &&
        this.estudiante.carrera &&
        this.estudiante.carrera.trim() !== "" &&
        this.estudiante.fechaNacimiento &&
        this.estudiante.telefono &&
        this.estudiante.telefono.trim() !== ""
      );
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  text-align: left;
}

h3 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 700;
}

.datos {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.datos label {
  font-weight: 600;
  color: #34495e;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

.datos input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 15px;
  color: #2c3e50;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.datos input:focus {
  border-color: #6c63ff;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15);
  outline: none;
}

.botones {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

/* Guardar & Actualizar (Primary) */
.botones button:nth-child(1),
.botones button:nth-child(2) {
  background: #6c63ff;
  color: white;
}

.botones button:nth-child(1):hover,
.botones button:nth-child(2):hover {
  background: #5a52d5;
}

/* Cancelar (Secondary/Danger) */
.botones button:nth-child(3) {
  background: #ff6b6b;
  color: white;
}

.botones button:nth-child(3):hover {
  background: #fa5252;
}

.error-msg {
  color: #e74c3c;
  font-size: 12px;
  font-weight: 500;
  margin-top: -10px;
  margin-bottom: 5px;
  display: block;
}
</style>