<script setup lang="ts">
interface Product {
  id: string
  name: string
  description: string
  tags: string[]
  price: string // For schema
  image: string
  defaultColor: number
  colors: { id: number; hex: string; name: string }[]
  badge?: string
}

const products = ref<Product[]>([
  {
    id: 'frisado',
    name: 'PVC Frisado Climm',
    description: 'Forro em PVC com textura sutil e elegante, que adiciona profundidade visual.',
    tags: ['Textura Sutil', 'Elegante', 'Durável'],
    price: '0.00',
    image: '/assets/produtos/1.png',
    defaultColor: 1,
    badge: '+ Pedido',
    colors: [
      { id: 1, hex: '#fefefe', name: 'Branco' },
      { id: 2, hex: '#661204', name: 'Mogno' },
      { id: 3, hex: '#553129', name: 'Nogueira' },
      { id: 4, hex: '#bd8e4e', name: 'Cerejeira' }
    ]
  },
  {
    id: 'liso',
    name: 'PVC Liso Climm',
    description: 'Forro em PVC de superfície uniforme, proporcionando um acabamento limpo.',
    tags: ['Matte Finish', 'Moderno', 'Uniforme'],
    price: '0.00',
    image: '/assets/produtos/1.png',
    defaultColor: 1,
    colors: [
      { id: 1, hex: '#fefefe', name: 'Branco' },
      { id: 2, hex: '#661204', name: 'Mogno' },
      { id: 3, hex: '#553129', name: 'Nogueira' },
      { id: 4, hex: '#bd8e4e', name: 'Cerejeira' }
    ]
  },
  {
    id: 'isolante',
    name: 'Isolante Térmico Climm',
    description: 'Isolante térmico de alta performance, compatível com todos os tipos.',
    tags: ['Premium', 'Eficiente', 'Fácil'],
    price: '0.00', // Schema requires price
    image: '/assets/pvc.png',
    defaultColor: 0,
    badge: '+ Proteção',
    colors: [] // No colors for isolante
  }
])

// Reactivity for selected colors
const selectedColors = reactive<Record<string, number>>({
  frisado: 1,
  liso: 1,
  isolante: 0
})

const sectionRef = ref(null)
const isVisible = ref(false)

import { useIntersectionObserver } from '@vueuse/core'
onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.1 })
  if (sectionRef.value) observer.observe(sectionRef.value as Element)
})

const getProductImage = (product: Product) => {
  if (product.colors.length === 0) return product.image
  const colorId = selectedColors[product.id]
  // Assuming legacy structure: 1.png, 2.png etc in /assets/produtos/
  // Legacy logic: "./assets/produtos/" + colorNumber + ".png"
  return `/assets/produtos/${colorId}.png`
}

const selectColor = (productId: string, colorId: number) => {
  selectedColors[productId] = colorId
}

const handleInterest = (productName: string) => {
  alert(`Interesse registrado em: ${productName}. Entraremos em contato!`)
}

const siteConfig = useSiteConfig()

// Product Schema for GEO
useSchemaOrg([
  ...products.value.map(product => ({
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${getProductImage(product)}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock'
    }
  }))
])
</script>

<template>
  <section id="produtos" ref="sectionRef" class="py-20 bg-gray-50 overflow-hidden scroll-mt-28">
    <div class="container mx-auto px-4 transition-all duration-1000 ease-out" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-normal text-primary-900 mb-4">Nossos Produtos</h2>
        <p class="text-xl text-gray-600 font-light">Descubra nossa seleção curada para uma vida equilibrada.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white/90 transition-all duration-500 overflow-hidden relative group transform hover:-translate-y-2 flex flex-col h-full"
        >
          <!-- Badge -->
          <div v-if="product.badge" class="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
            {{ product.badge }}
          </div>

          <!-- Image -->
          <div class="h-64 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <NuxtImg
              :src="getProductImage(product)"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width="400"
              height="300"
              loading="lazy"
              format="webp"
            />
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>

            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in product.tags" :key="tag" class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                {{ tag }}
              </span>
            </div>

            <p class="text-gray-600 text-sm mb-6 min-h-[3rem]">{{ product.description }}</p>

            <!-- Color Picker -->
            <div v-if="product.colors.length > 0" class="mb-6">
              <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">Cores:</span>
              <div class="flex gap-2">
                <button
                  v-for="color in product.colors"
                  :key="color.id"
                  @click="selectColor(product.id, color.id)"
                  class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none"
                  :class="selectedColors[product.id] === color.id ? 'border-primary-600 scale-110 shadow-sm' : 'border-gray-200'"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <!-- Action -->
            <button
              @click="handleInterest(product.name)"
              class="w-full bg-primary-900 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center gap-2 mt-auto"
            >
              <span>Tenho Interesse</span>
              <span v-if="product.id === 'isolante'">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
