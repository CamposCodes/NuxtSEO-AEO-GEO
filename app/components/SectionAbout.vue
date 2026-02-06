<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

// Static features data
const features = [
  { img: 'innovation', title: 'Inovação', desc: 'Soluções criativas e produtos de última geração para modernizar seu espaço' },
  { img: 'quality', title: 'Qualidade', desc: 'Materiais premium com certificação de excelência e garantia de durabilidade' },
  { img: 'satisfaction', title: 'Satisfação', desc: 'Atendimento dedicado e suporte completo do projeto até a instalação' }
]

const sectionRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.2 })
  if (sectionRef.value) observer.observe(sectionRef.value as Element)
})
</script>

<template>
  <section id="sobre" ref="sectionRef" class="w-full min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden scroll-mt-28">
    <div class="container mx-auto px-4 max-w-4xl relative z-10 transition-all duration-1000" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">

      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-5xl font-normal text-primary-900 mb-4">Sobre Nós</h2>
        <p class="text-xl text-gray-600 font-light">Inovação e Qualidade em Forros de PVC</p>
      </div>

      <!-- Intro Block (AEO) -->
      <div class="text-center mb-16 max-w-2xl mx-auto">
        <p class="text-xl leading-relaxed text-gray-700 font-medium">
          Há mais de 5 anos transformamos ambientes com soluções inovadoras em forros de PVC.
          Somos referência em qualidade, durabilidade e atendimento excepcional.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="rounded-3xl p-8 border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden group bg-white/70 backdrop-blur-xl border-white/60 text-gray-900 shadow-lg hover:border-transparent hover:bg-gradient-to-br hover:from-primary-900 hover:to-[color-mix(in_srgb,theme('colors.primary.900'),black_10%)]"
        >
          <!-- Icon Placeholder -->
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center p-3 mb-6 transition-transform duration-500 group-hover:scale-110 bg-primary-50 text-primary-900 group-hover:bg-white/20 group-hover:text-white"
          >
            <!-- Innovation (Lightbulb) -->
            <svg v-if="feature.img === 'innovation'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-8 h-8">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1.5 1.5-2.5 1.5-3.5a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 1 .5 2 1.5 3.5 2.5 1.8 3.5 2.5 3.5 2.5"></path>
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
            </svg>

            <!-- Quality (Shield Check) -->
            <svg v-if="feature.img === 'quality'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-8 h-8">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>

            <!-- Satisfaction (Smile) -->
            <svg v-if="feature.img === 'satisfaction'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-8 h-8">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>

          <h3
            class="text-xl font-bold mb-3 text-primary-900 group-hover:text-white transition-colors duration-300"
          >{{ feature.title }}</h3>

          <p
            class="text-sm leading-relaxed text-gray-600 group-hover:text-primary-100 transition-colors duration-300"
          >{{ feature.desc }}</p>

          <!-- Optional 'Learn More' arrow to match design vibe -->
          <div class="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
             <span class="text-sm font-bold flex items-center gap-1 text-white">
               Saber mais <span>&rarr;</span>
             </span>
          </div>
        </div>
      </div>

      <!-- Mission / Vision / Values (GEO Structured) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200/50 pt-16 mt-8">
        <!-- Mission -->
        <div class="rounded-3xl p-8 border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden group bg-white/70 backdrop-blur-xl border-white/60 text-gray-900 shadow-lg hover:border-transparent hover:bg-gradient-to-br hover:from-primary-900 hover:to-[color-mix(in_srgb,theme('colors.primary.900'),black_10%)]">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center p-3 mb-6 transition-transform duration-500 group-hover:scale-110 bg-primary-50 text-primary-900 group-hover:bg-white/20 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <h4 class="text-xl font-bold mb-3 text-primary-900 group-hover:text-white transition-colors duration-300">Nossa Missão</h4>
          <p class="text-sm leading-relaxed text-gray-600 group-hover:text-primary-100 transition-colors duration-300">Transformar espaços com soluções inovadoras, garantindo o melhor custo-benefício e elegância.</p>
          <div class="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
             <span class="text-sm font-bold flex items-center gap-1 text-white">
               Saber mais <span>&rarr;</span>
             </span>
          </div>
        </div>

        <!-- Difference -->
        <div class="rounded-3xl p-8 border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden group bg-white/70 backdrop-blur-xl border-white/60 text-gray-900 shadow-lg hover:border-transparent hover:bg-gradient-to-br hover:from-primary-900 hover:to-[color-mix(in_srgb,theme('colors.primary.900'),black_10%)]">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center p-3 mb-6 transition-transform duration-500 group-hover:scale-110 bg-primary-50 text-primary-900 group-hover:bg-white/20 group-hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h4 class="text-xl font-bold mb-3 text-primary-900 group-hover:text-white transition-colors duration-300">Nossa Diferença</h4>
          <p class="text-sm leading-relaxed text-gray-600 group-hover:text-primary-100 transition-colors duration-300">Variedade exclusiva de forros: convencionais, lisos, coloridos e isolantes térmicos de alta performance.</p>
          <div class="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
             <span class="text-sm font-bold flex items-center gap-1 text-white">
               Saber mais <span>&rarr;</span>
             </span>
          </div>
        </div>

        <!-- Commitment -->
        <div class="rounded-3xl p-8 border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden group bg-white/70 backdrop-blur-xl border-white/60 text-gray-900 shadow-lg hover:border-transparent hover:bg-gradient-to-br hover:from-primary-900 hover:to-[color-mix(in_srgb,theme('colors.primary.900'),black_10%)]">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center p-3 mb-6 transition-transform duration-500 group-hover:scale-110 bg-primary-50 text-primary-900 group-hover:bg-white/20 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h4 class="text-xl font-bold mb-3 text-primary-900 group-hover:text-white transition-colors duration-300">Nosso Compromisso</h4>
          <p class="text-sm leading-relaxed text-gray-600 group-hover:text-primary-100 transition-colors duration-300">Sustentabilidade ambiental, atendimento personalizado e controle de qualidade rigoroso em cada peça.</p>
          <div class="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
             <span class="text-sm font-bold flex items-center gap-1 text-white">
               Saber mais <span>&rarr;</span>
             </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
