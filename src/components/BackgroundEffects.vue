<script setup>
</script>

<template>
  <svg class="blotch" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <filter id="paperNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="3" seed="7" />
      <feColorMatrix type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.5 0" />
    </filter>
    <rect width="100%" height="100%" fill="#D8C9A2" filter="url(#paperNoise)" />
  </svg>

  <svg class="grain" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <filter id="grainNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.12" />
      </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" fill="#000" filter="url(#grainNoise)" />
  </svg>
</template>

<style scoped>
.grain, .blotch {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.grain { mix-blend-mode: multiply; opacity: 0.14; z-index: 60; }
.blotch { mix-blend-mode: multiply; opacity: 0.16; z-index: 1; }
</style>
