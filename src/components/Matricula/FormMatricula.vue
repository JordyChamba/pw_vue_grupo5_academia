<template>
  <div class="container">
    <h3>Nueva Matrícula</h3>
    <form action="">
      <div v-show="visible" class="datos">
        <label>Cédula Estudiante:</label>
        <span class="error-msg" v-if="validar && !cedulaInput">{{
          requerido
        }}</span>
        <input
          type="number"
          v-model="cedulaInput"
          placeholder="Ingrese cédula"
        />

        <label>Código Curso:</label>
        <span class="error-msg" v-if="validar && !codigoInput">{{
          requerido
        }}</span>
        <input
          type="text"
          v-model="codigoInput"
          placeholder="Ingrese código de curso"
        />
      </div>

      <div class="botones">
        <button
          type="submit"
          v-show="guardar"
          @click.prevent="guardarMatricula"
        >
          Guardar
        </button>
        <button @click.prevent="cancelar">Cancelar</button>
      </div>
      <h3>{{ mensaje }}</h3>
    </form>
  </div>
</template>


<script>
import { matricularFachada } from "@/clients/MatriculaClient";
import { mostrarPorCedulaFachada } from "@/clients/EstudianteClient";
import { mostrarPorCodigoFachada } from "@/clients/CursoClient";

export default {
  props: {
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
      matricula: {
        estudianteId: "",
        cursoId: "",
      },
      cedulaInput: "",
      codigoInput: "",
      mensaje: "",
      requerido: "Este campo es requerido",
      validar: false,
    };
  },
  methods: {
    async guardarMatricula() {
      this.validar = true;
      if (!this.cedulaInput || !this.codigoInput) {
        this.mensaje = "Ingrese cédula y código";
        this.tiempo();
        return;
      }

      try {
        // 1. Buscar Estudiante
        const est = await mostrarPorCedulaFachada(this.cedulaInput);
        if (!est || !est.id) {
          this.mensaje = "Estudiante no encontrado";
          this.tiempo();
          return;
        }

        // 2. Buscar Curso
        const cur = await mostrarPorCodigoFachada(this.codigoInput);
        if (!cur || !cur.id) {
          this.mensaje = "Curso no encontrado";
          this.tiempo();
          return;
        }
        // 3. Matricular
        this.matricula.estudianteId = est.id;
        this.matricula.cursoId = cur.id;
        await matricularFachada(this.matricula);
        this.$emit("salir");
        this.$emit("txt", 1);
        this.limpiar();
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al guardar matrícula";
        this.tiempo();
      }
    },
    cancelar() {
      this.$emit("salir");
      this.limpiar();
    },
    limpiar() {
      this.validar = false;
      this.matricula = {
        estudianteId: "",
        cursoId: "",
      };
      this.cedulaInput = "";
      this.codigoInput = "";
    },
    tiempo() {
      setTimeout(() => {
        this.mensaje = "";
      }, 4000);
    },
  },
  computed: {
    formularioValido() {
      return this.cedulaInput && this.codigoInput;
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

input {
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

input:focus {
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

.botones button:nth-child(1) {
  background: #6c63ff;
  color: white;
}

.botones button:nth-child(1):hover {
  background: #5a52d5;
}

.botones button:nth-child(2) {
  background: #ff6b6b;
  color: white;
}

.botones button:nth-child(2):hover {
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