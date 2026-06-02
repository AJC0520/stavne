<script setup>
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<style>
</style>
