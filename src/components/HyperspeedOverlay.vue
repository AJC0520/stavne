<template>
  <Teleport to="body">
    <div v-if="active" class="hyperspace-overlay">
      <canvas ref="canvas" class="hyperspace-canvas" />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref(false)
const canvas = ref(null)

let animFrame = null
let startTime = null
const DURATION = 800

const STREAK_COUNT = 180

function lerp(a, b, t) {
  return a + (b - a) * t
}

function easeIn(t) {
  return t * t * t
}

function drawFrame(timestamp) {
  if (!startTime) startTime = timestamp
  const elapsed = timestamp - startTime
  const progress = Math.min(elapsed / DURATION, 1)

  const cvs = canvas.value
  if (!cvs) return

  const W = cvs.width
  const H = cvs.height
  const cx = W / 2
  const cy = H / 2
  const ctx = cvs.getContext('2d')

  // Clear canvas each frame (transparent — page shows through)
  ctx.clearRect(0, 0, W, H)

  const speed = easeIn(progress)

  for (let i = 0; i < STREAK_COUNT; i++) {
    // Deterministic per-streak angle spread across full 360°
    const angle = (i / STREAK_COUNT) * Math.PI * 2

    // Each streak starts near center and shoots outward
    const minStart = 0.01
    const maxStart = 0.08
    const startRadius = lerp(minStart, maxStart, (i * 0.618) % 1) * Math.max(W, H)

    // How far they travel grows with speed
    const reach = lerp(0.2, 1.5, speed) * Math.max(W, H)

    const x1 = cx + Math.cos(angle) * startRadius * (1 + speed * 2)
    const y1 = cy + Math.sin(angle) * startRadius * (1 + speed * 2)
    const x2 = cx + Math.cos(angle) * (startRadius + reach)
    const y2 = cy + Math.sin(angle) * (startRadius + reach)

    // Width and brightness grow with speed
    const width = lerp(0.5, 3.5, speed) * (0.6 + ((i * 0.37) % 1) * 0.8)
    const alpha = lerp(0.3, 1.0, speed) * (0.5 + ((i * 0.51) % 1) * 0.5)

    // Color: white core with blue tint on outer streaks
    const blueAmt = Math.round(lerp(180, 255, (i * 0.29) % 1))
    const grad = ctx.createLinearGradient(x1, y1, x2, y2)
    grad.addColorStop(0, `rgba(255,255,255,0)`)
    grad.addColorStop(0.15, `rgba(255,255,255,${alpha})`)
    grad.addColorStop(0.5, `rgba(${blueAmt},${blueAmt},255,${alpha})`)
    grad.addColorStop(1, `rgba(${blueAmt - 60},${blueAmt - 60},255,0)`)

    ctx.beginPath()
    ctx.strokeStyle = grad
    ctx.lineWidth = width
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  if (progress < 1) {
    animFrame = requestAnimationFrame(drawFrame)
  } else {
    active.value = false
    startTime = null
  }
}

function startAnimation() {
  const cvs = canvas.value
  if (!cvs) return
  cvs.width = window.innerWidth
  cvs.height = window.innerHeight
  startTime = null
  animFrame = requestAnimationFrame(drawFrame)
}

router.beforeEach((to) => {
  if (to.meta.transition === 'hyperspeed') {
    active.value = true
    document.documentElement.classList.add('hyperspeed-active')
  }
})

watch(active, (val) => {
  if (!val) document.documentElement.classList.remove('hyperspeed-active')
})

// Start drawing once canvas is mounted
watch(canvas, (el) => {
  if (el) startAnimation()
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.hyperspace-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.hyperspace-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
