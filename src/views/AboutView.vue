<script setup>
  import { ref } from "vue";
  import authService from "../services/auth.service";
  //para Pinia
  import { useContadorStore } from "@/stores/contador"
  const contador = useContadorStore()

  const perfil = ref(null)

  async function funPerfil(){
    const {data} = await authService.getPerfil();
    perfil.value = data
  }
  funPerfil()
</script>

<template>
  <div class="card" v-if="perfil">
    <h1>CORREO: {{ perfil.email }}</h1>
    <h1>NOMBRE: {{ perfil.name }}</h1>
    <h2>{{ contador.micontador }}</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
