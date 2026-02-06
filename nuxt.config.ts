import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SSR is mandatory for AEO/GEO to ensure crawlers see content immediately
  ssr: true,

  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/fonts'
  ],

  // Site Config - Single Source of Truth
  site: {
    url: 'https://climm.com.br', // Placeholder per plan
    name: 'Climm - Soluções Inteligentes',
    description: 'Landing page otimizada para SEO, AEO e GEO usando Nuxt 4.',
    defaultLocale: 'pt-BR',
    identity: {
      type: 'Organization'
    }
  },

  // Robots.txt Strategy for AI/LLM visibility
  robots: {
    groups: [
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: ['/']
      },
      {
        userAgent: ['*'],
        allow: ['/']
      }
    ]
  },

  // Sitemap Configuration
  sitemap: {
    strictNuxtContentPaths: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.7
    }
  },

  // Tailwind Configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  }
})
