<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports'
import { watch } from 'vue'

const authStore = useAuthStore()

// Debugging: track token synchronization on the client-side
if (import.meta.client) {
  watch(() => authStore.token, (newToken) => {
    console.log('[DEBUG] Pinia Auth Token (Client):', newToken)
  }, { immediate: true })
}
</script>
