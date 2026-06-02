<script setup>
import { RouterLink } from 'vue-router'
import BackgroundEffects from '../components/BackgroundEffects.vue'
import StavneBlue from '../images/stavne_blue.png'
</script>

<template>
  <main class="viewport">
    <BackgroundEffects />
    <RouterLink to="/placeholder" class="house-link" aria-label="Go to placeholder page">
      <img class="house" :src="StavneBlue" alt="Stavne house in blue">
    </RouterLink>
  </main>
</template>

<style scoped>
.viewport {
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: antiquewhite;
}

.house-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.house {
  display: block;
  width: auto;
  height: auto;
  transition: transform 180ms ease, filter 180ms ease;
  transform-origin: center center;
}

.house-link:hover .house {
  transform: translateY(-0.25rem) scale(1.03);
  filter: drop-shadow(0 0.75rem 1.25rem rgba(67, 40, 8, 0.18));
  cursor: pointer;
}
</style>
