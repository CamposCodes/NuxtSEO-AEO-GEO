<script setup lang="ts">
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Produtos', href: '#produtos' },
  { name: 'Contato', href: '#contato' }
]

const activeSection = ref('')
const isScrolled = ref(false)

// Handle Scroll for Navbar styling and Active Link
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Simple scroll spy
  const sections = navLinks.map(link => link.href.substring(1))
  for (const sectionId of sections) {
    const section = document.getElementById(sectionId)
    if (section) {
      const rect = section.getBoundingClientRect()
      // If section is roughly in the middle of viewport
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        activeSection.value = '#' + sectionId
      }
    }
  }
}

// Smooth Scroll
const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = href
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Init
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-50 transition-all duration-300 rounded-full px-6 py-3 flex justify-between items-center border border-white/60"
    :class="[
      isScrolled ? 'bg-white/95 shadow-2xl backdrop-blur-xl scale-[1.02]' : 'bg-white/70 backdrop-blur-xl shadow-xl hover:bg-white/80'
    ]"
  >
    <!-- Logo -->
    <a href="#home" @click.prevent="scrollToSection('#home')" class="cursor-pointer group">
      <h1 class="text-xl font-normal tracking-tighter text-primary-900 group-hover:text-primary-600 transition-colors">
        Climm.
      </h1>
    </a>

    <!-- Navigation -->
    <ul class="hidden md:flex gap-1">
      <li v-for="link in navLinks" :key="link.href">
        <a
          :href="link.href"
          @click.prevent="scrollToSection(link.href)"
          class="px-4 py-2 rounded-2xl text-sm transition-all duration-700 ease-in-out text-gray-800 hover:text-primary-700 hover:bg-primary-900/10"
          :class="{
            'bg-primary-900 text-white shadow-md hover:text-white hover:bg-primary-800': activeSection === link.href
          }"
        >
          {{ link.name }}
        </a>
      </li>
    </ul>

    <!-- Mobile Menu (Simple Placeholder for now, can be expanded) -->
    <div class="md:hidden text-primary-900">
      <span class="text-sm font-bold">Menu</span>
    </div>
  </nav>
</template>

<style scoped>
/* Ensure navbar stays clear */
</style>
