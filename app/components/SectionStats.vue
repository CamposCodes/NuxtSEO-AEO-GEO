<script setup lang="ts">
const stats = [
  { prefix: '+', value: 5, label: 'Anos de Experiência', sub: 'Confiança e expertise no mercado' },
  { prefix: '+', value: 1000, label: 'Clientes Satisfeitos', sub: 'Projetos residenciais e comerciais' },
  { suffix: '%', value: 100, label: 'Qualidade Garantida', sub: 'Certificação de excelência' }
]

// Animated Counter Logic
// Initialize with actual values so SSR/Scrapers see the data (AEO fix)
const counts = reactive(stats.map(s => s.value))
const sectionRef = ref(null)
const hasAnimated = ref(false)

const animate = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true


  stats.forEach((stat, index) => {
    const duration = 2000 // 2s
    const start = 0
    const end = stat.value
    const startTime = performance.now()

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)

      counts[index] = Math.floor(start + (end - start) * ease)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        counts[index] = end
      }
    }
    requestAnimationFrame(update)
  })
}

// Trigger animation on visibility
import { useIntersectionObserver } from '@vueuse/core'
onMounted(() => {
    // If not using vueuse, use standard API
    const observer = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting) {
            animate()
        }
    }, { threshold: 0.3 })
    if (sectionRef.value) observer.observe(sectionRef.value as Element)
})
</script>

<template>
  <section id="resultados" ref="sectionRef" class="py-20 bg-primary-900 text-white relative overflow-hidden">
    <!-- Decorative Circle -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>

    <div class="container mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl md:text-5xl font-normal mb-16">Por que escolher a Climm?</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
        >
          <div class="flex items-center justify-center text-5xl md:text-6xl font-bold mb-4 text-primary-200">
            <span v-if="stat.prefix" class="mr-2 text-3xl opacity-70 leading-none">{{ stat.prefix }}</span>
            <span>{{ counts[index] }}</span>
            <span v-if="stat.suffix" class="ml-2 text-3xl opacity-70 leading-none">{{ stat.suffix }}</span>
          </div>
          <h3 class="text-xl font-medium mb-2">{{ stat.label }}</h3>
          <p class="text-primary-100 text-sm opacity-80">{{ stat.sub }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
