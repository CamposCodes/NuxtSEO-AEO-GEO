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

  // O uso do siteConfig para definir a identidade única da Climm e a ativação modular da suíte @nuxtjs/seo
  // Site Config - Single Source of Truth
  // Zero Config, onde uma única fonte de verdade alimenta o Robots, Sitemap e Schema.org simultaneamente
  site: {
    url: 'https://climm.vercel.app',
    name: 'Climm - PVC para Soluções Inteligentes',
    description: 'Inovação e Qualidade em Forros de PVC. Há mais de 5 anos transformamos ambientes com soluções inovadoras em forros de PVC.',
    defaultLocale: 'pt-BR',
    identity: {
      type: 'Organization'
    }
  },


  // Sitemap Configuration
  sitemap: {
    strictNuxtContentPaths: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.7
    }
  },

  // Performance & Rendering Strategy (Core Web Vitals)
  routeRules: {
    // Homepage is static-heavy, prerender for max speed (TTFB ~0ms)
    '/': { prerender: true },
    // API routes (if any) would go here
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // Tailwind
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  }
})
