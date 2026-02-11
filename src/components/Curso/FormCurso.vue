<template>
  <div class="container">
    <h3>Datos Curso</h3>
      <form action="">
      <div class="datos">
        <label for="codigoCurso">Codigo:</label>
        <span class="error-msg" v-if="validar && !curso.codigoCurso">{{
          requerido
        }}</span>
        <input
          type="text"
          id="codigoCurso"
          v-model="curso.codigoCurso"
          required
          placeholder="ingrese codigo curso"
        />
        <label for="nombre">Nombre:</label>
        <span class="error-msg" v-if="validar && !curso.nombre">{{
          requerido
        }}</span>
        <input type="text" id="nombre" v-model="curso.nombre" required placeholder="ingrese nombre curso"/>
        <label for="descripcion">Descripcion:</label>
        <span class="error-msg" v-if="validar && !curso.descripcion">{{
          requerido
        }}</span>
        <input
          type="text"
          id="descripcion"
          v-model="curso.descripcion"
          placeholder="ingrese descripcion curso"
          required
        />
        <label for="creditos">Creditos:</label>
        <span class="error-msg" v-if="validar && !curso.creditos">{{
          requerido
        }}</span>
        <input type="number" id="creditos" v-model="curso.creditos" required placeholder="ingrese creditos curso"/>
        <label for="cupos">Cupos:</label>
        <span class="error-msg" v-if="validar && !curso.cupos">{{
          requerido
        }}</span>
        <input type="number" id="cupos" v-model="curso.cupos" required placeholder="ingrese cupos curso"/>
      </div>
      <div class="botones">
        <button
          type="submit"
          v-show="guardar"
          @click.prevent="guardarCurso"
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
  mostrarPorIdFachada,
  guardarFachada,
  actualizarFachada,
} from "@/clients/CursoClient";
export default {
  props: {
    codigoBuscar: {
      type: String,
      required: true,
    },
    guardar: {
      type: Boolean,
    },
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      curso: {
        id: "",
        codigoCurso: "",
        nombre: "",
        descripcion: "",
        creditos: "",
        cupos: "",
      },
      requerido: "Este campo es requerido",
      validar: false,
      mensaje: "",
    };
  },
  watch: {
    codigoBuscar(newValue, oldValue) {
      console.log(oldValue + " aqui llego");
      if (oldValue !== newValue) {
        (this.mensaje = ""), this.Buscar(newValue);
      }
    },
  },

  methods: {
    async Buscar(id) {
      const respuesta = await mostrarPorIdFachada(id);
      this.curso = respuesta;
    },

    async actualizar() {
      try {
        await actualizarFachada(this.curso.id, this.curso);
        this.$emit("salir", "");
        this.$emit("txt", 2);
        this.limpiar();
      } catch {
        this.mensaje = "No se actualizo";
        this.tiempo();
      }
    },

    async guardarCurso() {
      try {
        this.validar = true;
        this.curso.id = null;
        if (this.formularioValido) {
          await guardarFachada(this.curso);
          this.$emit("salir", "");
          this.$emit("txt", 1);
          this.limpiar();
        }
      } catch {
        this.mensaje = "No se guardo";
        this.tiempo();
      }
    },
    limpiar() {
      this.false = false;
      this.curso.id = "";
      this.curso.codigoCurso = "";
      this.curso.nombre = "";
      this.curso.descripcion = "";
      this.curso.creditos = "";
      this.curso.cupos = "";
    },
    cancelar() {
      this.$emit("salir", "");
      this.limpiar();
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
        this.curso.codigoCurso &&
        this.curso.codigoCurso.trim() !== "" &&
        this.curso.nombre &&
        this.curso.nombre.trim() !== "" &&
        this.curso.descripcion &&
        this.curso.descripcion.trim() !== "" &&
        this.curso.creditos !== "" &&
        this.curso.creditos > 0 &&
        this.curso.cupos !== "" &&
        this.curso.cupos >= 0
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

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.botones button:nth-child(1),
.botones button:nth-child(2) {
  background: #6c63ff;
  color: white;
}

.botones button:nth-child(1):hover,
.botones button:nth-child(2):hover {
  background: #5a52d5;
}

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