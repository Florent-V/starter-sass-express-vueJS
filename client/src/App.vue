<script setup>
import { RouterView } from 'vue-router'
import PWABadge from '@/components/PWABadge.vue'
import HeaderNavbar from '@/components/HeaderNavbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div
      class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <HeaderNavbar/>

    <main class="flex-grow md:px-2 flex flex-col">
      <RouterView/>
    </main>

    <FooterComponent/>
    <PWABadge/>
  </div>
</template>

<style scoped>

</style>