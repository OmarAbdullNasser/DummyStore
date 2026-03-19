<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports'
import { watch } from 'vue'

const authStore = useAuthStore()


</script>
