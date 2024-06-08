<script setup>
import TheWelcome from '../components/TheWelcome.vue'
//para Pinia
import { useContadorStore } from "@/stores/contador"
const contador = useContadorStore()
</script>

<template>
  <main>
    <div class="card">
      <h1>{{ contador.micontador }}</h1>
      <Button @click="contador.reducir">-</Button>
      <Button @click="contador.aumentar">+</Button>
    </div>
  </main>
</template>
