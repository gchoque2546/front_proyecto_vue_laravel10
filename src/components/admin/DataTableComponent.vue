<template>
    <h1>Componente DataTable Child</h1>
    <!--{{ props.data }}-->
    <DataTable :value="props.data">
        <Column v-for="col in props.columns" :field="col.key" :header="col.label" :key="col.id"></Column>
        <Column headerStyle="min-width:3rem;">
            <template #body="slotProps">
                <Button
                    icon="pi pi-plus"
                    class="mr-2"
                    severity="warning"
                    rounded
                    @click="alert(slotProps.data.id)"
                ></Button>
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
const props = defineProps(["data", "columns"])
</script>