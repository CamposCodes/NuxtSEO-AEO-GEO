<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

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
  <section id="contato" ref="sectionRef" class="py-20 bg-white overflow-hidden scroll-mt-28">
    <div class="container mx-auto px-4 max-w-4xl text-center transition-all duration-1000 ease-out" :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
      <h2 class="text-3xl md:text-5xl font-normal text-primary-900 mb-6">Fale Conosco</h2>
      <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
        Não perca mais tempo. Entre em contato conosco e descubra como podemos ajudá-lo a renovar seu espaço.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Phone -->
        <a href="tel:+5511999999999" class="group bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
          <div class="w-12 h-12 bg-primary-100 text-primary-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Telefone</h3>
          <p class="text-gray-600 group-hover:text-primary-700 transition-colors">(11) 99999-9999</p>
        </a>

        <!-- Email -->
        <a href="mailto:contato@climm.com.br" class="group bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
          <div class="w-12 h-12 bg-primary-100 text-primary-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">E-mail</h3>
          <p class="text-gray-600 group-hover:text-primary-700 transition-colors">contato@climm.com.br</p>
        </a>

        <!-- Location -->
        <div class="group bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
          <div class="w-12 h-12 bg-primary-100 text-primary-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform p-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Endereço</h3>
          <p class="text-gray-600 group-hover:text-primary-700 transition-colors text-center text-sm">R. Ten. Lucas Drumont, 75<br>Jardim Natal, Juiz de Fora - MG</p>
        </div>
      </div>

      <!-- Google Maps Embed -->
      <div class="mt-12 w-full h-[400px] rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white/50 backdrop-blur-sm">
        <iframe
          title="Mapa de Localização Climm"
          src="https://maps.google.com/maps?q=R.+Ten.+Lucas+Drumont,+75+-+Jardim+Natal,+Juiz+de+Fora+-+MG&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style="border:0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>
