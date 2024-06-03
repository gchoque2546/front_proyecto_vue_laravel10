<template>
    <!--p>{{ props.data }}</p-->

    <DataTable :value="props.data">
        <Column field="id" header="ID"></Column>
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="precio" header="PRECIO"></Column>
        <Column field="categoria.nombre" header="CATEGORIA"></Column>
        <Column field="stock" header="STOCK"></Column>
        <Column headerStyle="min-width:3rem;">
            <template #body="slotProps">
                <Button
                    icon="pi pi-plus"
                    class="mr-2"
                    severity="warning"
                    rounded
                    @click="agregar(slotProps.data)"
                ></Button>
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
    const props = defineProps(['nombre', 'data']);
    const emit = defineEmits(['funCarrito']);

    function agregar(prod) {
        emit("funCarrito", prod);
    }
</script>