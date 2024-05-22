<template>
    <div class="card">
        <h1>Producto</h1>
        <!--{{ productos }}-->
        <Toast />
        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <Button label="Nuevo Producto" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                </div>
            </template>

            <template v-slot:end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
            </template>
        </Toolbar>
        <DataTable
            ref="dt"
            :value="productos"
            :totalRecords="totalRecords"
            lazy
            :loading="loading"
            @page="onPage($event)"
            dataKey="id"
            :paginator="true"
            :rows="5"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[2, 5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
            responsiveLayout="scroll"
        >
            <template #header>
                <div
                    class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                >
                    <h5 class="m-0">Gestión Productos</h5>
                    <IconField iconPosition="left" class="block mt-2 md:mt-0">
                        <InputIcon class="pi pi-search" />
                        <InputText class="w-full sm:w-auto" placeholder="Buscar..." v-model="buscar" @keypress.enter="buscador()"/>
                    </IconField>
                </div>
            </template>
            <Column
                field="id"
                header="ID"
                :sortable="true"
                headerStyle="width:2%; min-width:2rem;"
            >
                <template #body="slotProps">
                    <span class="p-column-title">ID</span>
                    {{ slotProps.data.id }}
                </template>
            </Column>
            <Column
                field="nombre"
                header="NOMBRE"
                :sortable="true"
                headerStyle="width:14%; min-width:10rem;"
            >
                <template #body="slotProps">
                    <span class="p-column-title">Nombre</span>
                    {{ slotProps.data.nombre }}
                </template>
            </Column>
            <Column
                field="precio"
                header="PRECIO"
                :sortable="true"
                headerStyle="width:14%; min-width:10rem;"
            >
                <template #body="slotProps">
                    <span class="p-column-title">Precio</span>
                    {{ slotProps.data.precio }}
                </template>
            </Column>
            <Column
                field="stock"
                header="STOCK"
                :sortable="true"
                headerStyle="width:14%; min-width:10rem;"
            >
                <template #body="slotProps">
                    <span class="p-column-title">Stock</span>
                    {{ slotProps.data.stock }}
                </template>
            </Column>
            <Column
                field="categoria_id"
                header="CATEGORIA"
                :sortable="true"
                headerStyle="width:14%; min-width:10rem;"
            >
                <template #body="slotProps">
                    <span class="p-column-title">Categoria</span>
                    {{ slotProps.data.categoria.nombre }}
                </template>
            </Column>
            <Column headerStyle="min-width:10rem;">
                <template #body="slotProps">
                    <Button
                        icon="pi pi-image"
                        class="mr-2"
                        severity="info"
                        rounded
                        @click="imagenProducto(slotProps.data)"
                    />
                    <Button
                        icon="pi pi-pencil"
                        class="mr-2"
                        severity="success"
                        rounded
                        @click="editProduct(slotProps.data)"
                    />
                    <Button
                        icon="pi pi-trash"
                        class="mt-2"
                        severity="warning"
                        rounded
                        @click="confirmDeleteProduct(slotProps.data)"
                    />
                </template>
            </Column>
        </DataTable>

        <Dialog
            v-model:visible="productDialog" 
            :style="{ width: '450px' }" 
            header="Producto" 
            :modal="true"
            class="p-fluid"
        >
        <!--{{ product }}-->
            <img
                :src="'/demo/images/product/' + product.image"
                :alt="product.image"
                v-if="product.image"
                width="150"
                class="mt-0 mx-auto mb-5 block shadow-2" />
            <div class="field">
                <label for="name">Nombre</label>
                <InputText
                    id="nombre"
                    v-model.trim="product.nombre"
                    required="true"
                    autofocus
                    :invalid="submitted && !product.nombre"
                />
                <small class="p-invalid" v-if="submitted && !product.nombre"
                    >Nombre Obligatorio.</small>
            </div>
            <div class="field">
                <label for="descripcion">Descripción</label>
                <Textarea
                    id="descripcion"
                    v-model="product.descripcion"
                    rows="3"
                    cols="20"
                />
            </div>

            <div class="field">
                <label class="mb-3">Categoria</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6" v-for="cat in categorias" :key="cat.id">
                        <RadioButton
                            :value="cat.id"
                            v-model="product.categoria_id"
                        />
                        <label for="category1">{{ cat.nombre }}</label>
                    </div>
                </div>
            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Precio</label>
                    <InputNumber
                        id="price"
                        v-model="product.precio"
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        :invalid="submitted && !product.precio"
                        :required="true"
                    />
                    <small class="p-invalid" v-if="submitted && !product.precio"
                        >Precio es Obligatorio.</small>
                </div>
                <div class="field col">
                    <label for="quantity">Stock</label>
                    <InputNumber
                        id="quantity"
                        v-model="product.stock" integeronly
                    />
                </div>
            </div>
            <template #footer>
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    text="" @click="hideDialog"
                />
                <Button
                    label="Save"
                    icon="pi pi-check"
                    text="" @click="saveProduct"
                />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product"
                    >¿Esta Seguro de Eliminar el Producto? <b>{{ product.nombre }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>
        <!--13:26-->
        <Dialog
            v-model:visible="productDialogImagen" 
            :style="{ width: '650px' }" 
            header="Imagen" 
            :modal="true"
            class="p-fluid"
        >
        <img :src="`http://127.0.0.1:8000/${product.imagen}`" alt="" width="250">
        <FileUpload
            customUpload @uploader="subirImagenProducto"
            @upload="onAdvancedUpload($event)"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
        >
            <template #empty>
                <p>Arrastrar y Soltar para subir Imagen.</p>
            </template>
        </FileUpload>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import productoService from "./../../services/producto.service"
import categoriaService from "./../../services/categoria.service"
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const productos = ref([])
const categorias = ref([])
const totalRecords = ref(0)
const dt = ref(null);
const productDialog = ref(false);
//const deleteProductDialog = ref(false);
//const deleteProductsDialog = ref(false);
const product = ref({});
const submitted = ref(false);
const deleteProductDialog = ref(false);
const productDialogImagen = ref(false);
const buscar = ref("")

//para lazy
const loading = ref(false)
const lazyParams = ref({page: 0})

onMounted(() => {
    listarProductos();
    getCategorias();
});

const onPage = (event) => {
    console.log(event)
    lazyParams.value = event;
    listarProductos()
}

async function listarProductos() {
    loading.value = true

    let page = lazyParams.value.page+1;
    let limit = lazyParams.value.rows;

    const { data } = await productoService.listar(page, limit, buscar.value);
    loading.value = false
    console.log(data);
    productos.value = data.data;
    totalRecords.value = data.total;
};
async function getCategorias() {
    const { data } = await categoriaService.listar();
    console.log(data);
    categorias.value = data;
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const exportCSV = () => {
    dt.value.exportCSV();
};
const saveProduct = async () => {
    submitted.value = true;
    if (
        product.value.nombre &&
        product.value.nombre.trim() &&
        product.value.precio
    ){
        if (product.value.id) {
            await productoService.modificar(product.value, product.value.id)
            listarProductos()
            toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Producto Actualizado',
                life: 3000
            });
        } else {
            await productoService.guardar(product.value)
            listarProductos()
            toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Producto Creado',
                life: 3000
            });
        }
        productDialog.value = false;
        product.value = {};
    }
};
const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};
const imagenProducto = (prod) => {
    product.value = { ...prod };
    productDialogImagen.value = true;
};
const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};
const deleteProduct = async () => {
    await productoService.eliminar(product.value.id);
    listarProductos();
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Producto Eliminado',
        life: 3000
    });
};
const buscador = () => {
    listarProductos()
};
const subirImagenProducto = async (event) => {
    const file = event.files[0];
    let formData = new FormData();
    formData.append("imagen",file)
    await productoService.actualizarImagen(product.value.id, formData)
    productDialogImagen.value = false;
    product.value = {};
    listarProductos();
    toast.add({
        severity: 'success',
        summary: 'Imagen Subida',
        detail: 'Producto Imagen Actualizado',
        life: 3000
    });
};
</script>