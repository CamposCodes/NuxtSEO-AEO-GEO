<template>
  <div class="font-sans antialiased text-gray-900 bg-white selection:bg-primary-200 selection:text-primary-900">
    <TheNavBar />

    <main>
      <SectionHero />

      <SectionFAQ :items="faqs" />

      <SectionStats />
      <SectionAbout />
      <SectionProducts />
      <SectionContact />
    </main>

    <TheFooter />

    <!-- Scroll to Top Button -->
    <button
      class="fixed bottom-8 right-8 bg-primary-900 text-white p-4 rounded-full shadow-xl hover:bg-primary-700 transition-all duration-300 z-50 opacity-0 invisible"
      :class="{ 'opacity-100 visible translate-y-0': showScrollTop, 'translate-y-10': !showScrollTop }"
      @click="scrollToTop"
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  </div>
</template>

<script setup lang="ts">
// Explicit import not needed for object syntax
// import { defineWebPage, defineFAQPage } from '#imports'

const siteConfig = useSiteConfig()

// Scroll to Top Logic
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// FAQ Data for AEO (PVC Context)
const faqs = [
  {
    question: 'O forro de PVC da Climm é resistente?',
    answer: 'Sim, os forros Climm são fabricados com material de alta durabilidade, resistentes a umidade, cupins e não propagam chamas, garantindo segurança e longevidade.'
  },
  {
    question: 'Quais os modelos de forro PVC disponíveis?',
    answer: 'Oferecemos modelos frisados, lisos, coloridos (mogno, cerejeira, nogueira) e isolantes térmicos, adaptáveis a qualquer estilo de decoração.'
  },
  {
    question: 'A Climm realiza instalação?',
    answer: 'Sim, fornecemos suporte completo desde a escolha do material até a instalação profissional, garantindo acabamento perfeito.'
  }
]

// Implement FAQ Schema (Object Syntax for reliability)
useSchemaOrg([
  {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#webpage`,
    name: 'Climm - Forros de PVC de Alta Qualidade',
    description: 'Soluções em forros de PVC, isolamento térmico e acabamentos para sua obra.'
  }
])

// Page specific SEO
useSeoMeta({
  title: 'Início',
  description: 'Climm Forros PVC - Qualidade, durabilidade e beleza para seu ambiente. Confira nossos modelos frisados, lisos e amadeirados.',
  ogTitle: 'Climm - Forros de PVC Premium',
  ogDescription: 'Transforme seu ambiente com a qualidade e sofisticação dos forros Climm.',
})
</script>
