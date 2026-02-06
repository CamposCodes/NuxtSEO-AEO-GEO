<script setup lang="ts">

interface FAQItem {
  question: string
  answer: string
}

const props = defineProps<{
  items: FAQItem[]
}>()

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

// Automatic AEO Schema Generation
useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: props.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
])
</script>

<template>
  <section id="faq" class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">Tire suas dúvidas sobre nossos forros de PVC e serviços.</p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
        >
          <button
            @click="toggle(index)"
            class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            :aria-expanded="openIndex === index"
          >
            <span class="text-lg font-semibold text-gray-900">{{ item.question }}</span>
            <span
              class="ml-6 flex-shrink-0 transition-transform duration-300 transform"
              :class="openIndex === index ? 'rotate-180' : ''"
            >
              <svg class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div
            v-show="openIndex === index"
            class="px-6 pb-6 text-gray-600 leading-relaxed animate-fade-in"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
