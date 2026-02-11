<template>
  <div class="container">
    <div class="container_buscar">
      <div class="buscar">
        <input
          type="number"
          id="cedula_buscar"
          v-model="cedulaBuscar"
          placeholder="Cédula del estudiante"
        />
        <div class="container_btn">
          <button class="btn" @click="buscar">Buscar</button>
        </div>
      </div>
    </div>
    <div v-show="acciones" class="datos">
      <table class="table">
        <thead class="thead">
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Curso</th>
            <th>Fecha</th>
            <th>Estado Matricula</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mat in matriculas" :key="mat.id">
            <td>{{ mat.id }}</td>
            <td>
              {{
                mat.estudiante
                  ? mat.estudiante.nombre + " " + mat.estudiante.apellido
                  : "N/A"
              }}
            </td>
            <td>{{ mat.curso ? mat.curso.nombre : "N/A" }}</td>
            <td>{{ mat.fecha }}</td>
            <td>{{ mat.estado }}</td>
            <td v-show="validar(mat.estado)">
              <button class="edi" @click="editar(mat.id)">Anular</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn-regresar" v-show="acciones" @click="regresar">Regresar</button>
  </div>
</template>

<script>
import {
  mostrarPorCedulaEstudianteFachada,
  borrarFachada,
} from "@/clients/MatriculaClient";

export default {
  data() {
    return {
      acciones: false,
      cedulaBuscar: "",
      matriculas: [],
    };
  },

  methods: {
    validar(estado) {
      if (estado === "ANULADA") {
        return false;
      }else{
        return true;
      }
    },
    async buscar() {
      try {
        const resp = await mostrarPorCedulaEstudianteFachada(this.cedulaBuscar);
        if (resp && resp.length > 0) {
          this.matriculas = resp;
          this.acciones = true;
          this.cedulaBuscar = "";
        } else {
          this.cedulaBuscar = "";
          this.$emit("txt", 4);
        }
      } catch {
        this.cedulaBuscar = "";
        this.$emit("txt", 4);
      }
    },
    async editar(id) {
      await borrarFachada(id);
      this.acciones = false;
      this.cedulaBuscar = "";
      this.$emit("txt", 3);
    },
    regresar() {
      this.acciones = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  font-family: 'Inter', sans-serif;
}

.datos {
  width: 100%;
  max-width: 900px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.container_buscar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  margin-bottom: 25px;
}

.buscar {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
}

input {
  flex: 1;
  max-width: 400px;
  padding: 12px 20px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 15px;
  background-color: #fcfcfc;
  transition: all 0.3s;
}

input:focus {
  border-color: #4CAF50;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
  outline: none;
}

.container_btn {
  display: inline-block;
}

button.btn {
  padding: 12px 30px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(76, 175, 80, 0.2);
}

button.btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table thead th {
  padding: 15px;
  text-align: left;
  background-color: #f8f9fa;
  color: #7f8c8d;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid #eaebec;
}

.table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  color: #2c3e50;
  font-size: 14px;
}

.table tbody tr:hover {
  background-color: #fafbfc;
}

button.edi {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  width: auto;
  min-width: 70px;
  transition: all 0.2s;
  background-color: #ffebee;
  color: #e74c3c;
}

button.edi:hover {
  background-color: #ffcdd2;
  color: #c0392b;
}

.btn-regresar {
  margin-top: 25px;
  padding: 12px 30px;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-regresar:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

</style>
