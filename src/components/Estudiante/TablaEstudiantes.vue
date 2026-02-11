<template>
  <div class="container">
    <div class="container_buscar">
      <p class="buscar">
        <input
          type="number"
          id="cedula_buscar"
          v-model="cedulaBuscar"
          placeholder="Cédula del estudiante"
        />
        <button class="btn" @click="buscar">Buscar</button>
      </p>
    </div>
    <div class="datos">
      <table class="table">
        <thead class="thead">
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Carrera</th>
            <th>Teléfono</th>
            <th v-show="acciones">Acción</th>
            <th v-show="acciones">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="est in estudiantes" :key="est.id">
            <td>{{ est.cedula }}</td>
            <td>{{ est.nombre }}</td>
            <td>{{ est.apellido }}</td>
            <td>{{ est.carrera }}</td>
            <td>{{ est.telefono }}</td>
            <td v-show="acciones">
              <button class="edi" @click="editar(est.id)">Editar</button>
            </td>
            <td v-show="acciones">
              <button class="eli" @click="eliminar(est.id)">Eliminar</button>
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
  mostrarTodosFachada,
  mostrarPorCedulaFachada,
  borrarFachada,
} from "@/clients/EstudianteClient";

export default {
  data() {
    return {
      acciones: false,
      cedulaBuscar: "",
      estudiantes: [],
    };
  },
  mounted() {
    this.Todos();
  },
  methods: {
    async Todos() {
      const resp = await mostrarTodosFachada();
      if (resp) {
        this.estudiantes = resp;
      }
    },
    async buscar() {
      try {
        const resp = await mostrarPorCedulaFachada(this.cedulaBuscar);
        if (resp) {
          this.estudiantes = [resp];
          this.acciones = true;
          this.cedulaBuscar = "";
        }
      } catch {
        this.cedulaBuscar = "";
        this.$emit("txt", 4);
      }
    },
    regresar() {
      this.Todos();
      this.acciones = false;
    },
    editar(id) {
      this.$emit("editar", id);
    },
    async eliminar(id) {
      await borrarFachada(id);
      this.Todos();
      this.acciones = false;
      this.cedulaBuscar = "";
      this.$emit("txt", 3);
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
}

.container_buscar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  margin-bottom: 25px;
}

p.buscar {
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

button.edi, button.eli {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  width: auto;
  min-width: 70px;
  transition: all 0.2s;
}

button.edi {
  background-color: #e8f5e9;
  color: #2ecc71;
}

button.edi:hover {
  background-color: #dcedc8;
  color: #27ae60;
}

button.eli {
  background-color: #ffebee;
  color: #e74c3c;
}

button.eli:hover {
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
