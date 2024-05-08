<script setup>
//importaciones
  import { ref, onMounted } from "vue";
  import categoriaService from "@/services/categoria.service.js";
  import { useToast } from 'primevue/usetoast';

  //variables o estados reactivos
  const categorias = ref([])
  const categoria = ref({nombre: '',detalle: ''})
  const visible = ref(false);
  const toast = useToast();

  //Metodos o funciones
  onMounted(() =>{
    getCategorias()
  })
  async function getCategorias(){
    const datos = await categoriaService.listar();
    categorias.value = datos.data
  }
  async function guardarCategoria(){
    try {
        if(categoria.value.id){
            await categoriaService.modificar(categoria.value, categoria.value.id)
            getCategorias()
            visible.value = false
            categoria.value = {nombre: '',detalle: ''}
            toast.add({ severity: 'info', summary: 'Categoria Modificada', detail: 'La Categoria ha sido Modificada', life: 8000 });
        }
        else{
            await categoriaService.guardar(categoria.value);
            getCategorias()
            visible.value = false
            categoria.value = {nombre: '',detalle: ''}
            toast.add({ severity: 'info', summary: 'Categoria Registrada', detail: 'La Categoria ha sido Registrada', life: 8000 });
        }
        
    } catch (error) {
        alert(error)
    }
  }
  function editarCat(cat){
    categoria.value = cat;
    visible.value = true;
  }
  async function eliminarCat(id){
    if(confirm("¿Esta seguro de eliminar la Categoria?")){
        await categoriaService.eliminar(id);
        getCategorias()
        toast.add({ severity: 'info', summary: 'Categoria Eliminada', detail: 'La Categoria ha sido Eliminada', life: 8000 });
    }
  }
</script>

<template>
    <div class="card">
        <h5>Gestion Categorias</h5>
        <!--<pre>{{ categorias }}</pre>-->

        <!--
        <label>Ingrese Nombre</label>
        <input type="text" v-model="categoria.nombre">
        <label>Ingrese Detalle</label>
        <textarea cols="30" rows="3" v-model="categoria.detalle"></textarea>
        <button @click="guardarCategoria()">Guardar</button>
        -->

        <Button label="Nueva Categoria" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Nueva Categoria" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Ingrese los Datos.</span>
            <div class="flex align-items-center gap-3 mb-3">
                <!--nombre-->
                <!--1:15-->
                <label class="font-semibold w-6rem">Ingrese Nombre</label>
                <InputText class="flex-auto" autocomplete="off" v-model="categoria.nombre"/>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <!--detalle-->
                <label class="font-semibold w-6rem">Ingrese Detalle</label>
                <InputText class="flex-auto" autocomplete="off" v-model="categoria.detalle"/>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Guardar" @click="guardarCategoria()"></Button>
            </div>
        </Dialog>

        <DataTable :value="categorias" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="detalle" header="DETALLE"></Column>
            <Column header="GESTION">
                <template #body="slotProps">
                    <!--<button @click="editarCat(slotProps.data)">Editar</button>
                    <button @click="eliminarCat(slotProps.data.id)">Eliminar</button>-->
                    <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editarCat(slotProps.data)" />
                    <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="eliminarCat(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>

        <!--
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DETALLE</th>
                    <th>GESTION</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categorias" :key="cat.id">
                    <td>{{ cat.id }}</td>
                    <td>{{ cat.nombre }}</td>
                    <td>{{ cat.detalle }}</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        -->
        <Toast />
    </div>
</template>