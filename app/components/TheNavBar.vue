<script setup lang="ts">
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Produtos', href: '#produtos' },
  { name: 'Contato', href: '#contato' }
]

const activeSection = ref('')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

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

// Sync URL Hash on active section change (Deep Linking)
watch(activeSection, (newHash) => {
  if (newHash && window.location.hash !== newHash) {
    history.replaceState(null, '', newHash)
  }
})

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

    <!-- Mobile Menu Toggle -->
    <button
      class="md:hidden text-primary-900 focus:outline-none"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      aria-label="Toggle Menu"
    >
      <div class="relative w-6 h-6 flex flex-col justify-center gap-1.5 overflow-hidden">
        <span
          class="w-full h-0.5 bg-current rounded-full transition-all duration-300"
          :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="w-full h-0.5 bg-current rounded-full transition-all duration-300"
          :class="isMobileMenuOpen ? 'opacity-0 translate-x-full' : ''"
        ></span>
        <span
          class="w-full h-0.5 bg-current rounded-full transition-all duration-300"
          :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </div>
    </button>

    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute top-full left-0 mt-4 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 overflow-hidden md:hidden flex flex-col p-2"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click.prevent="scrollToSection(link.href); isMobileMenuOpen = false"
          class="px-4 py-3 rounded-xl text-center text-gray-800 hover:text-primary-700 hover:bg-primary-900/5 transition-colors"
          :class="{
            'bg-primary-900/10 text-primary-900 font-medium': activeSection === link.href
          }"
        >
          {{ link.name }}
        </a>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
/* Ensure navbar stays clear */
</style>
