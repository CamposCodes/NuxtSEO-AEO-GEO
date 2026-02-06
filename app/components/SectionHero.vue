<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)
const isLoaded = ref(false)

const playVideo = async () => {
  if (!videoRef.value) return
  try {
    await videoRef.value.play()
    isLoaded.value = true
  } catch (e) {
    console.warn('Autoplay prevented:', e)
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.muted = true
    playVideo()
  }
})

// Video SEO Schema
useSchemaOrg([
  {
    '@type': 'VideoObject',
    name: 'Forro PVC Climm - Alta Qualidade',
    description: 'Demonstração dos forros de PVC Climm: durabilidade, estética e sustentabilidade para seu ambiente.',
    uploadDate: '2024-01-01', // Approximate
    thumbnailUrl: '/assets/pvc.png',
    contentUrl: '/assets/climm-pvc.mp4',
    embedUrl: '/assets/climm-pvc.mp4',
    duration: 'PT15S', // Estimate 15-30s based on loop
    inLanguage: 'pt-BR'
  }
])
</script>

<template>
  <section id="home" class="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-hero-gray pt-16">
    <!-- Gradient Background -->
    <div class="absolute inset-0 pointer-events-none z-0 bg-hero-gradient"></div>

    <div class="container mx-auto px-4 z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <!-- Media Section -->
      <div class="relative flex justify-center order-1 md:order-1 animate-slide-in-left">
        <div class="relative w-full max-w-[700px]">
          <video
            ref="videoRef"
            class="w-full h-auto object-contain block"
            autoplay
            loop
            muted
            playsinline
            poster="/assets/pvc.png"
          >
            <source src="/assets/climm-pvc.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <!-- Content Section (GEO Optimized) -->
      <div class="flex flex-col gap-6 text-left order-2 md:order-2">
        <h1 class="text-4xl md:text-6xl font-light text-gray-800 leading-tight animate-fade-in-up">
          Transforme seu <br>
          <span class="font-bold text-primary-900">ambiente</span>
        </h1>

        <h2 class="text-2xl md:text-4xl font-normal text-gray-700 animate-fade-in-up delay-100">
          com forros <span class="font-bold text-primary-900">Climm.</span>
        </h2>

        <p class="text-lg md:text-xl text-gray-500 font-light max-w-lg animate-fade-in-up delay-200">
          Qualidade premium em forro de PVC, unindo durabilidade, estética e sustentabilidade.
        </p>

        <div class="mt-4 animate-fade-in-up delay-300">
          <a href="#produtos" class="group relative inline-flex items-center justify-between bg-primary-900 text-white font-bold py-1.5 pl-8 pr-1.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-primary-800 w-auto min-w-[260px]">
            <span class="mr-4 tracking-wide text-lg">Conhecer Produtos</span>
            <span class="w-11 h-11 bg-white text-primary-900 rounded-full flex items-center justify-center transition-all duration-300 group-active:scale-95 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-hero-gradient {
  background: radial-gradient(circle 800px at 0% 0%, rgba(189, 223, 255, 0.25) 0%, transparent 50%),
              radial-gradient(circle 600px at 100% 100%, rgba(160, 200, 240, 0.2) 0%, transparent 50%);
}
</style>
