# Project Context: Modern Nuxt 3 Landing Page for AEO/GEO

> 📚 **Ordem de Leitura para IA**: Este é o arquivo **2 de 3** — Leia nesta ordem para contexto completo:
> 1. **[skills.md](skills.md)** — Regras, padrões e anti-patterns obrigatórios
> 2. **[Context.md](Context.md)** (ATUAL) — Contexto do projeto, estratégias e roteiro de demo
> 3. **[Docs.md](Docs.md)** — APIs técnicas, composables e referências de documentação
>
> **Propósito deste arquivo**: Define o contexto completo do projeto, estratégias de implementação para SEO/AEO/GEO, roteiro de demonstração e métricas de sucesso. Use em conjunto com skills.md para entender O QUE fazer e COMO fazer.

---

## 🎯 Objetivo do Projeto

Desenvolver uma **Landing Page de Próxima Geração** no Nuxt 3 que transcenda o SEO tradicional, posicionando-se como:

1. **Fonte Primária para IAs Generativas** (GEO): Ser citado e referenciado por ChatGPT, Perplexity, Gemini, Claude como fonte confiável
2. **Destaque em Respostas Diretas** (AEO): Conquistar Position Zero e Featured Snippets no Google
3. **Excelência Técnica em SEO**: Máxima performance em Core Web Vitals e indexação perfeita

**Princípio Fundamental**: Não basta ser encontrado. Precisamos ser **A Fonte da Verdade** que motores generativos citam e motores de busca destacam.

---

## 📊 Diferenças Críticas: SEO vs AEO vs GEO

| Dimensão | SEO Tradicional | AEO | GEO |
|----------|----------------|-----|-----|
| **Objetivo** | Aparecer nos resultados | Ser a resposta destacada | Ser citado como fonte |
| **Métrica de Sucesso** | Posição no ranking (1-10) | Featured Snippet / Position Zero | Citação em LLM response |
| **Formato Ideal** | Artigo longo (2000+ palavras) | Resposta concisa (40-60 palavras) | Dados estruturados + contexto factual |
| **Ferramenta Principal** | Backlinks + Keywords | FAQ Schema + Listas semânticas | JSON-LD + Grafos de conhecimento |
| **Exemplo de Vitória** | "Página 1, posição 3" | "Position Zero no Google" | "Citado por ChatGPT como fonte" |
| **Validação** | Google Search Console | Rich Results Test | Testar prompts em Perplexity.ai |
| **Foco de Conteúdo** | Palavras-chave naturais | Perguntas diretas como H2/H3 | Dados verificáveis com fontes |
| **Público Alvo** | Humanos que clicam | Assistentes de voz (Alexa, Siri) | LLMs que citam fontes |

### Exemplo Prático:
**Query**: "Como configurar Nuxt SEO?"

- **SEO tradicional**: Artigo de 3000 palavras ranqueado na posição 5
- **AEO**: Snippet destacado com passo a passo de 50 palavras na Position Zero
- **GEO**: ChatGPT responde: "Segundo [seusite.com], para configurar Nuxt SEO você deve..."

---

## 🛠️ Tech Stack & Setup

### Framework & Rendering
- **Nuxt 3** (versão 3.10+)
  - Modo: **SSR (Server-Side Rendering)** - OBRIGATÓRIO
  - Nitro Engine habilitado para edge computing
  - TypeScript: Fortemente recomendado para type safety

### SEO Stack (Nuxt SEO Ecosystem)
Baseado na documentação oficial: https://nuxtseo.com/

```bash
# Instalação recomendada (instala todo o ecossistema)
npx nuxi@latest module add @nuxtjs/seo
```

**Módulos incluídos automaticamente**:
- `@nuxtjs/robots`: Controle de crawlers via robots.txt
- `@nuxtjs/sitemap`: Sitemap XML dinâmico
- `nuxt-schema-org`: Schema.org via composables
- `nuxt-og-image`: OG Images dinâmicas com Satori
- `nuxt-seo-kit`: Kit completo de utilitários SEO

### Estilização (OBRIGATÓRIO: Tailwind CSS)

> ⚠️ **REGRA DE OURO**: Tailwind CSS é o **ÚNICO** framework de estilização deste projeto.
> - **Meta de Performance**: Bundle CSS < 10KB em produção
> - **Cobertura**: 95%+ dos estilos via utility classes
> - **CSS Customizado**: Apenas para animações complexas (keyframes multi-step)

**Instalação**:
```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

**Configuração obrigatória** (`nuxt.config.ts`):
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss' // OBRIGATÓRIO
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true // DevTools integration
  }
})
```

| Decisão | Status | Justificativa para SEO/AEO/GEO |
|---------|--------|--------------------------------|
| **Tailwind CSS** | ✅ OBRIGATÓRIO | Bundle mínimo, SSR perfeito, Core Web Vitals otimizados |
| **UnoCSS** | ❌ REMOVIDO | Padronização única para consistência |
| **Nuxt UI** | ❌ NÃO USAR | Priorizar controle total de bundle e performance |
| **CSS Customizado** | ⚠️ EXCEÇÃO | Apenas keyframes complexos ou overrides de terceiros |

### Ferramentas de Desenvolvimento
- **Nuxt DevTools**: Auditoria SEO em tempo real (aba SEO)
  - Ativação: Automática no modo dev
  - Atalho: `Shift + Alt + D` (Windows/Linux) ou `Shift + Option + D` (Mac)
- **Schema Markup Validator**: https://validator.schema.org/
- **Lighthouse CI**: Integração contínua de performance
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Tailwind Play**: https://play.tailwindcss.com/ (testar classes rapidamente)

---

## 🎨 Tailwind CSS para Performance Máxima

> **Por que Tailwind é OBRIGATÓRIO para SEO/AEO/GEO?**
> 1. ✅ **HTML Semântico Preservado**: Classes CSS não afetam estrutura HTML para crawlers
> 2. ✅ **Bundle < 10KB**: Tree-shaking automático remove classes não usadas
> 3. ✅ **SSR Perfeito**: Zero conflito com renderização servidor (Nitro)
> 4. ✅ **Core Web Vitals**: CSS inline automático para Critical Path (LCP < 2.5s)
> 5. ✅ **Velocidade de Dev**: 3x mais rápido que CSS customizado

### Configuração Otimizada (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],

  // Dark mode por classe (melhor controle)
  darkMode: 'class',

  theme: {
    extend: {
      // Cores da marca (SEO: consistência visual)
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        },
        brand: {
          DEFAULT: '#00DC82', // Nuxt green
          dark: '#00b368'
        }
      },

      // Tipografia otimizada para legibilidade
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },

      // Animações leves (performance)
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },

  plugins: [
    // Opcional: @tailwindcss/typography para prose
    // require('@tailwindcss/typography')
  ]
} satisfies Config
```

### Breakpoints Mobile-First (Responsividade)

| Breakpoint | Min-width | Uso Típico |
|------------|-----------|------------|
| Base | `0px` | Mobile (padrão) |
| `sm:` | `640px` | Tablets pequenos |
| `md:` | `768px` | Tablets |
| `lg:` | `1024px` | Desktop |
| `xl:` | `1280px` | Desktop grande |
| `2xl:` | `1536px` | Telas 4K |

**Exemplo - Layout Responsivo**:
```vue
<template>
  <div class="container mx-auto px-4">
    <!-- Mobile: 1 coluna, Tablet: 2 colunas, Desktop: 3 colunas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Card Responsivo</h3>
        <p class="text-gray-700 text-sm md:text-base">Conteúdo adaptável</p>
      </div>
    </div>
  </div>
</template>
```

### Padrões de Classes Obrigatórios

#### ✅ CORRETO: Tailwind Puro (95%+ dos casos)
```vue
<template>
  <section class="py-16 bg-gradient-to-br from-primary-50 to-blue-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-900">
        Título SEO-Friendly
      </h2>
      <p class="text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
        Descrição otimizada para featured snippets (40-60 palavras).
      </p>
    </div>
  </section>
</template>
<!-- ✅ ZERO <style> section necessária -->
```

#### ❌ ERRADO: CSS Customizado Desnecessário
```vue
<template>
  <section class="hero-section">
    <h2 class="hero-title">Título</h2>
  </section>
</template>

<style scoped>
/* ❌ PROIBIDO - Use Tailwind classes! */
.hero-section {
  padding: 4rem 0;
  background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
}
.hero-title {
  font-size: 2rem;
  font-weight: bold;
}
</style>
```

#### ⚠️ EXCEÇÃO: Animações Complexas (único caso permitido)
```vue
<template>
  <div class="animate-pulse-glow">Elemento animado</div>
</template>

<style>
/* ⚠️ PERMITIDO apenas para keyframes complexos não suportados nativamente */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
  }
}
.animate-pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
```

**⚠️ MELHOR**: Adicionar ao `tailwind.config.ts` e usar `class="animate-pulse-glow"` diretamente.

---

## 📐 Estratégia de Implementação

### 1. Infraestrutura Base

#### A. Configuração Central (`nuxt.config.ts`)
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // SSR obrigatório para AEO/GEO
  ssr: true,

  // Módulos SEO
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss'
  ],

  // Site Config - Single Source of Truth
  site: {
    url: 'https://seudominio.com', // CRÍTICO: URL de produção
    name: 'Nome da Sua Marca',
    description: 'Descrição oficial da marca (150-160 caracteres para meta description)',
    defaultLocale: 'pt-BR',
    identity: {
      type: 'Organization' // ou 'Person' se for marca pessoal
    }
  },

  // Robots.txt estratégico
  robots: {
    // Permitir crawlers tradicionais
    allow: ['/'],

    // Estratégia para bots generativos
    groups: [
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: ['/'], // Permitir para maximizar citações
        disallow: ['/admin', '/api'] // Proteger áreas sensíveis
      },
      {
        // Bloquear bots de scraping indesejados
        userAgent: ['AhrefsBot', 'SemrushBot'],
        disallow: ['/'] // Opcional: economizar banda
      }
    ]
  },

  // Sitemap dinâmico
  sitemap: {
    strictNuxtContentPaths: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    // URLs dinâmicas (ex: blog posts)
    urls: async () => {
      // const posts = await fetchBlogPosts()
      // return posts.map(post => ({
      //   loc: `/blog/${post.slug}`,
      //   lastmod: post.updatedAt,
      //   priority: 0.8
      // }))
      return []
    }
  },

  // OG Image padrão
  ogImage: {
    defaults: {
      component: 'NuxtSeo',
      props: {
        colorMode: 'dark',
        theme: '#00DC82'
      }
    }
  }
})
```

#### B. App Config (`app.config.ts`)
Separar configurações de conteúdo da configuração técnica:
```typescript
// app.config.ts
export default defineAppConfig({
  brand: {
    tagline: 'Seu tagline ou slogan aqui',
    logo: '/logo.svg',
    socialLinks: {
      twitter: 'https://twitter.com/suamarca',
      linkedin: 'https://linkedin.com/company/suamarca',
      github: 'https://github.com/suamarca'
    }
  },

  // Dados para Schema Organization
  company: {
    name: 'Nome Legal da Empresa',
    foundingDate: '2020-01-01',
    email: 'contato@seudominio.com',
    phone: '+55 11 98765-4321'
  }
})
```

---

### 2. AEO (Answer Engine Optimization)

**Objetivo**: Conquistar Featured Snippets e Position Zero no Google

#### Táticas de Implementação:

#### A. FAQ Estruturado
```vue
<!-- components/FAQ.vue -->
<script setup lang="ts">
const faqs = [
  {
    question: 'O que é Nuxt SEO?',
    answer: 'Nuxt SEO é um conjunto de módulos oficiais para otimização de sites Nuxt 3. Inclui geração automática de sitemap, robots.txt, Schema.org e Open Graph images para maximizar visibilidade em buscadores e IAs generativas.'
  },
  {
    question: 'Qual a diferença entre AEO e SEO?',
    answer: 'AEO (Answer Engine Optimization) foca em aparecer em respostas diretas e snippets destacados, enquanto SEO tradicional busca ranquear em resultados orgânicos. AEO prioriza estruturas de FAQ e dados semânticos para assistentes de voz e Position Zero.'
  }
]

useSchemaOrg([
  defineFAQPage({
    mainEntity: faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  })
])
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Perguntas Frequentes</h2>
      <dl class="space-y-6 max-w-4xl mx-auto">
        <div
          v-for="faq in faqs"
          :key="faq.question"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
          <dt class="font-bold text-xl mb-3 text-primary-600">
            <h3>{{ faq.question }}</h3>
          </dt>
          <dd class="text-gray-700 leading-relaxed">
            <p>{{ faq.answer }}</p>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
```

#### B. Respostas Diretas (Formato 40-60 palavras)
Estruturar conteúdo com blocos concisos após cada H2:
```vue
<template>
  <article class="prose prose-lg max-w-4xl mx-auto py-12 px-4">
    <h2 class="text-3xl font-bold mb-4 text-gray-900">O que é GEO?</h2>
    <p class="text-gray-700 leading-relaxed mb-8">
      GEO (Generative Engine Optimization) é a prática de otimizar conteúdo para motores
      generativos como ChatGPT e Perplexity. Envolve estruturação de dados factuais,
      implementação de Schema.org e criação de grafos de conhecimento para ser citado
      como fonte primária.
    </p>

    <h2 class="text-3xl font-bold mb-4 text-gray-900">Por que GEO é importante?</h2>
    <p class="text-gray-700 leading-relaxed">
      Com o crescimento de assistentes de IA, 40% das buscas não resultam mais em cliques
      (fonte: SparkToro, 2025). GEO garante que seu conteúdo seja citado diretamente nas
      respostas, mantendo autoridade mesmo sem tráfego direto.
    </p>
  </article>
</template>
```

#### C. Listas e Tabelas Semânticas
```vue
<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <caption class="text-lg font-semibold mb-4 text-gray-900 text-left px-6 py-4 bg-gray-50">
        Comparação: SEO vs AEO vs GEO
      </caption>
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estratégia</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Objetivo Principal</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ferramenta Chave</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Métrica de Sucesso</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">SEO</td>
          <td class="px-6 py-4 text-gray-700">Ranquear em resultados orgânicos</td>
          <td class="px-6 py-4 text-gray-700">Backlinks + Keywords</td>
          <td class="px-6 py-4 text-gray-700">Posição 1-10 no Google</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">AEO</td>
          <td class="px-6 py-4 text-gray-700">Aparecer em respostas diretas</td>
          <td class="px-6 py-4 text-gray-700">FAQ Schema + Listas</td>
          <td class="px-6 py-4 text-gray-700">Featured Snippet</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">GEO</td>
          <td class="px-6 py-4 text-gray-700">Ser citado por IAs generativas</td>
          <td class="px-6 py-4 text-gray-700">JSON-LD + Dados factuais</td>
          <td class="px-6 py-4 text-gray-700">Citação em ChatGPT/Perplexity</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

#### D. HowTo Schema (Guias Passo a Passo)
```vue
<!-- components/HowToGuide.vue -->
<script setup lang="ts">
const steps = [
  {
    name: 'Instalar Nuxt SEO',
    text: 'Execute no terminal: npx nuxi@latest module add @nuxtjs/seo'
  },
  {
    name: 'Configurar Site Config',
    text: 'Adicione url, name e description no nuxt.config.ts dentro do objeto site'
  },
  {
    name: 'Validar com DevTools',
    text: 'Abra Nuxt DevTools (Shift+Alt+D) e verifique a aba SEO para confirmar meta tags'
  }
]

useSchemaOrg([
  defineHowTo({
    name: 'Como configurar Nuxt SEO em 3 passos',
    step: steps
  })
])
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Como configurar Nuxt SEO</h2>
      <ol class="space-y-6 max-w-3xl">
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="flex gap-4 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-600 text-white font-bold rounded-full text-lg">
            {{ index + 1 }}
          </span>
          <div>
            <h3 class="font-bold text-lg mb-2 text-gray-900">{{ step.name }}</h3>
            <p class="text-gray-700 leading-relaxed">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
```

---

### 3. GEO (Generative Engine Optimization)

**Objetivo**: Ser fonte primária para ChatGPT, Perplexity, Gemini, Claude

#### Táticas de Implementação:

#### A. Identidade de Marca (Organization Schema Global)
```vue
<!-- app.vue -->
<script setup lang="ts">
const appConfig = useAppConfig()
const siteConfig = useSiteConfig()

useSchemaOrg([
  defineOrganization({
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${appConfig.brand.logo}`,
    description: siteConfig.description,
    foundingDate: appConfig.company.foundingDate,

    // Links para redes sociais (critical para E-E-A-T)
    sameAs: [
      appConfig.brand.socialLinks.twitter,
      appConfig.brand.socialLinks.linkedin,
      appConfig.brand.socialLinks.github
    ],

    // Contato
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: appConfig.company.email,
      telephone: appConfig.company.phone,
      availableLanguage: ['pt-BR', 'en-US']
    }
  })
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

#### B. Grafos de Conhecimento (Linked Data)
```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const siteConfig = useSiteConfig()

useSchemaOrg([
  // WebPage principal
  {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: 'Início - Landing Page Moderna',
    description: 'Landing page otimizada para AEO e GEO',

    // Conectar à Organization
    about: {
      '@id': `${siteConfig.url}/#organization`
    },

    // Breadcrumb
    breadcrumb: {
      '@id': `${siteConfig.url}/#breadcrumb`
    }
  },

  // Breadcrumb List
  {
    '@type': 'BreadcrumbList',
    '@id': `${siteConfig.url}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: siteConfig.url
      }
    ]
  }
])
</script>
```

#### C. Dados Factuais e Citáveis
```vue
<template>
  <article>
    <h2>Especificações Técnicas do Nuxt 3</h2>
    <ul>
      <li><strong>Versão Atual:</strong> 3.11.2 (Fevereiro 2026)</li>
      <li><strong>Motor de Renderização:</strong> Nitro 2.9 (fonte: nitro.unjs.io)</li>
      <li><strong>Compatibilidade:</strong> Node.js 18.x, 20.x, 22.x | TypeScript 5.x</li>
      <li><strong>Performance:</strong> Lighthouse Score médio de 95+ (fonte: nuxt.com/blog/performance)</li>
      <li><strong>Bundle Size:</strong> 75% menor que Nuxt 2 (~50KB gzipped vs 200KB)</li>
      <li><strong>Empresas Usando:</strong> GitLab, Sideshow, Upwork (fonte: nuxt.com/showcase)</li>
    </ul>

    <p class="text-sm text-gray-600 mt-4">
      Última atualização: 05 de Fevereiro de 2026 |
      Fontes: <a href="https://nuxt.com">nuxt.com</a>, <a href="https://nitro.unjs.io">nitro.unjs.io</a>
    </p>
  </article>
</template>
```

#### D. E-E-A-T para IA (Expertise, Authoritativeness, Trustworthiness)
```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
// Exemplo para artigo de blog
useSchemaOrg([
  defineArticle({
    headline: 'Guia Completo de Nuxt SEO para 2026',
    description: 'Tutorial detalhado sobre otimização de Nuxt 3 para AEO e GEO',

    // Autoria (critical para E-E-A-T)
    author: {
      '@type': 'Person',
      name: 'Seu Nome',
      jobTitle: 'Especialista em SEO e Engenharia Semântica',
      url: 'https://seudominio.com/sobre',
      sameAs: [
        'https://linkedin.com/in/seuperfil',
        'https://github.com/seuperfil'
      ]
    },

    // Publicador
    publisher: {
      '@type': 'Organization',
      name: 'Sua Marca',
      logo: 'https://seudominio.com/logo.png'
    },

    // Datas (freshness signal)
    datePublished: '2026-02-05T10:00:00-03:00',
    dateModified: '2026-02-05T15:30:00-03:00',

    // Imagem destacada
    image: 'https://seudominio.com/og-nuxt-seo-guide.png'
  })
])
</script>
```

#### E. Breadcrumbs para Contexto Navegacional
```vue
<!-- components/Breadcrumb.vue -->
<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  path: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const siteConfig = useSiteConfig()

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: props.items.map((item, index) => ({
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
      position: index + 1
    }))
  })
])
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex items-center space-x-2 text-sm">
      <li v-for="(item, index) in items" :key="item.path" class="flex items-center">
        <NuxtLink
          :to="item.path"
          class="text-primary-600 hover:text-primary-800 hover:underline transition-colors duration-200"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.name }}
        </NuxtLink>
        <span
          v-if="index < items.length - 1"
          class="mx-2 text-gray-400"
          aria-hidden="true"
        >/</span>
      </li>
    </ol>
  </nav>
</template>
```

---

### 4. Experiência Social (Open Graph & Twitter Cards)

#### A. Meta Tags Dinâmicas por Página
```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const siteConfig = useSiteConfig()

useSeoMeta({
  // Meta tags básicas
  title: 'Início - Landing Page Moderna',
  description: 'Landing page otimizada para SEO, AEO e GEO usando Nuxt 3 e @nuxtjs/seo',

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  ogTitle: 'Landing Page Moderna - Otimizada para IA',
  ogDescription: 'Descubra como criar landing pages que aparecem em ChatGPT e Position Zero',
  ogImage: `${siteConfig.url}/og-home.png`,
  ogType: 'website',
  ogUrl: siteConfig.url,

  // Twitter Cards
  twitterCard: 'summary_large_image',
  twitterTitle: 'Landing Page Moderna',
  twitterDescription: 'Otimizada para SEO, AEO e GEO',
  twitterImage: `${siteConfig.url}/og-home.png`
})
</script>
```

#### B. OG Image Dinâmica com Satori
```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

// Buscar dados do post (exemplo)
const post = {
  title: 'Como usar Nuxt SEO',
  description: 'Guia completo para iniciantes',
  author: 'Seu Nome'
}

// Gerar OG Image dinâmica
defineOgImageComponent('NuxtSeo', {
  title: post.title,
  description: post.description,
  theme: '#00DC82',
  colorMode: 'dark'
})
</script>
```

---

## 🎬 Roteiro de Demonstração (Live Demo)

### Preparação (Antes da Apresentação)

**Checklist pré-demo**:
- [ ] Projeto Nuxt rodando em `localhost:3000` (executar `npm run dev`)
- [ ] Nuxt DevTools instalado e funcional
- [ ] Browser com abas abertas:
  - Tab 1: `localhost:3000`
  - Tab 2: https://validator.schema.org/
  - Tab 3: Chrome DevTools → Lighthouse
- [ ] Código-fonte aberto no VS Code com arquivos relevantes visíveis

---

### Demo Flow (5 minutos)

#### **Minuto 1-2: Validação Visual com Nuxt DevTools**

**O que fazer**:
```bash
# Terminal já deve estar rodando
npm run dev

# Navegador em localhost:3000
# Pressionar: Shift + Alt + D (Windows/Linux) ou Shift + Option + D (Mac)
```

**O que mostrar**:
1. Abrir **Nuxt DevTools**
2. Navegar até aba **"SEO"**
3. Apontar para:
   - ✅ **Meta Tags**: Título, descrição, canonical visíveis
   - ✅ **Open Graph**: OG tags preenchidas automaticamente
   - ✅ **JSON-LD**: Schema.org renderizado (expandir para mostrar)
   - ✅ **Robots.txt**: Configuração de bots visível

**O que dizer**:
> "Aqui vemos em tempo real TUDO que os bots estão lendo. Note que o Schema.org
> está automaticamente injetado no HTML - isso é o que ChatGPT e Perplexity leem
> para entender o contexto do site."

---

#### **Minuto 3: Validação de Schema.org**

**O que fazer**:
1. Clicar com **botão direito** na página → **"Exibir código-fonte da página"** (View Page Source)
2. Buscar (Ctrl+F) por: `<script type="application/ld+json">`
3. Copiar **TODO** o bloco JSON-LD (desde `{` até `}`)
4. Abrir aba do **Schema Validator**: https://validator.schema.org/
5. Colar o JSON na área de texto
6. Clicar em **"Validate"**

**O que mostrar**:
- Resultado: ✅ **"No errors detected"**
- Apontar para as entidades reconhecidas (Organization, WebPage, FAQPage, etc.)

**O que dizer**:
> "Este validador é o mesmo que o Google usa internamente. Zero erros significa
> que estamos 100% elegíveis para Rich Results - aqueles cards destacados que
> aparecem no topo das buscas."

---

#### **Minuto 4: Auditoria de Performance com Lighthouse**

**O que fazer**:
1. No navegador (ainda em `localhost:3000`), abrir **Chrome DevTools** (F12)
2. Navegar para aba **"Lighthouse"**
3. Selecionar:
   - ✅ Performance
   - ✅ SEO
   - ❌ Desmarcar outros (para velocidade)
4. Clicar em **"Analyze page load"**

**O que mostrar (enquanto carrega)**:
- Explicar que Core Web Vitals são **sinais de ranqueamento** no Google
- SSR garante que o conteúdo está pronto antes do JavaScript carregar

**O que mostrar (resultado)**:
- **SEO Score**: 100/100 ✅
- **Performance Score**: 95+/100 ✅
- Apontar para métricas específicas:
  - **LCP** (Largest Contentful Paint): < 2.5s
  - **CLS** (Cumulative Layout Shift): < 0.1

**O que dizer**:
> "Note que conseguimos SEO perfeito E performance excelente. Isso acontece porque
> o SSR do Nuxt entrega HTML completo instantaneamente - não há 'flash' de conteúdo
> carregando."

---

#### **Minuto 5: Prova de GEO (Demonstração Conceitual)**

**⚠️ Nota**: Demonstração real de GEO requer site em produção indexado. Para localhost, fazer demonstração conceitual.

**Opção A - Site em Produção**:
1. Abrir https://www.perplexity.ai/
2. Fazer pergunta específica relacionada ao conteúdo do site, exemplo:
   - "Como configurar Nuxt SEO usando @nuxtjs/seo?"
3. Verificar se o site aparece nas **Sources citadas**

**Opção B - Localhost (Demonstração Conceitual)**:
1. Mostrar o bloco JSON-LD novamente no View Source
2. Abrir um documento com exemplo de resposta do ChatGPT citando o site (preparar screenshot preview)

**O que dizer**:
> "Este grafo de dados estruturados é exatamente o que LLMs como ChatGPT leem.
> Quando este site estiver em produção e indexado, ao perguntarem 'Como usar Nuxt SEO?',
> o Perplexity citará este site como fonte primária - assim:"
> [mostrar screenshot de exemplo]

**Exemplo de Screenshot a preparar**:
```
Pergunta no Perplexity: "Como configurar Nuxt SEO?"

Resposta:
"Para configurar Nuxt SEO, você deve instalar o módulo @nuxtjs/seo
e configurar o objeto site no nuxt.config.ts com url, name e description [1]."

Sources:
[1] seudominio.com - Guia de Nuxt SEO
```

---

### Troubleshooting Durante Demo

| Problema | Solução Rápida |
|----------|----------------|
| DevTools não abre | Verificar se `nuxt.config.ts` tem `devtools: { enabled: true }` |
| Schema não aparece no DevTools | Recarregar página (Ctrl+R) ou reiniciar dev server |
| Lighthouse Score baixo | Explicar: "Em produção com build otimizado, o score sobe para 95+" |
| View Source mostra HTML vazio | **CRÍTICO**: Significa que SSR não está funcionando - verificar `ssr: true` |

---

## ✅ Workflow de Validação (Checklist de Desenvolvimento)

### Durante Desenvolvimento (Local)
- [ ] **Servidor rodando**: `npm run dev` sem erros
- [ ] **Nuxt DevTools aberto**: Atalho `Shift + Alt + D`
- [ ] **Aba SEO do DevTools**:
  - [ ] Meta tags preenchidas (title, description, canonical)
  - [ ] OG tags configuradas (og:title, og:image, og:url)
  - [ ] JSON-LD visível e formatado
  - [ ] Robots.txt acessível em `/robots.txt`
  - [ ] Sitemap acessível em `/sitemap.xml`
- [ ] **View Source (Ctrl+U)**: HTML completo visível (não vazio!)
- [ ] **Schema Validator**: JSON-LD copiado do View Source → 0 erros em validator.schema.org
- [ ] **Lighthouse Local**:
  - [ ] SEO: 95+/100
  - [ ] Performance: 85+/100 (local é mais baixo que produção)

### Antes do Deploy (Pré-Produção)
- [ ] **Build de produção**: `npm run build` sem erros
- [ ] **Preview de produção**: `npm run preview` e repetir testes acima
- [ ] **Lighthouse em preview**:
  - [ ] SEO: 100/100
  - [ ] Performance: 90+/100
- [ ] **Google Rich Results Test**:
  - Testar URL em https://search.google.com/test/rich-results
  - Verificar elegibilidade para rich snippets
- [ ] **Open Graph Preview**:
  - Testar em https://www.opengraph.xyz/
  - Verificar se imagem OG está carregando

### Pós-Deploy (Produção)
- [ ] **Google Search Console**:
  - [ ] Submeter sitemap
  - [ ] Solicitar indexação de páginas principais
  - [ ] Monitorar Core Web Vitals
- [ ] **Bing Webmaster Tools**: Repetir processo acima
- [ ] **Teste de Citação em LLMs** (após indexação - ~2 semanas):
  - [ ] Perplexity.ai: Fazer 10 perguntas relacionadas, verificar citações
  - [ ] ChatGPT (com Browsing): Verificar se site é mencionado em respostas
- [ ] **Monitoramento contínuo**:
  - [ ] Ahrefs/SEMrush: Posicionamento de palavras-chave
  - [ ] Google Analytics: Tráfego orgânico
  - [ ] Search Console: Impressões, cliques, CTR

---

## ⛔ Anti-Patterns de Performance (SEO/AEO/GEO)

> **CRÍTICO**: Estas práticas degradam diretamente a performance de SEO, AEO e GEO.
> Consulte [skills.md](skills.md) para a lista completa de regras obrigatórias.

### Impacto Direto em Métricas

| Anti-Pattern | Métrica Afetada | Impacto | Solução |
|--------------|-----------------|---------|---------|
| CSS customizado excessivo | Bundle size | +200KB, LCP > 4s | Usar Tailwind classes |
| Meta tags em `onMounted` | Indexação | Invisível para bots | Executar no `<script setup>` |
| Schema duplicado | Rich Results | Conflito de dados | Definir apenas em `app.vue` |
| `<ClientOnly>` em conteúdo crítico | Crawlability | Conteúdo não indexado | Mover para SSR |
| Imagens sem `loading="lazy"` | LCP | > 2.5s | Adicionar atributo |
| URLs hardcoded | Manutenibilidade | Erros em staging/prod | Usar `useSiteConfig()` |
| Dados não-factuais | GEO | Não citado por LLMs | Incluir fontes verificáveis |

### ❌ Práticas Proibidas

#### 1. CSS Customizado Desnecessário
```vue
<!-- ❌ PROIBIDO -->
<template>
  <div class="minha-classe-custom">Conteúdo</div>
</template>

<style scoped>
.minha-classe-custom {
  padding: 2rem;
  background: linear-gradient(to right, #667eea, #764ba2);
  border-radius: 0.5rem;
}
</style>
```

```vue
<!-- ✅ CORRETO -->
<template>
  <div class="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">Conteúdo</div>
</template>
<!-- Zero <style> section -->
```

#### 2. Meta Tags Client-Side
```vue
<!-- ❌ PROIBIDO -->
<script setup lang="ts">
onMounted(() => {
  document.title = 'Título' // Crawlers não veem!
  useSeoMeta({ description: 'Desc' }) // Tarde demais!
})
</script>
```

```vue
<!-- ✅ CORRETO -->
<script setup lang="ts">
useSeoMeta({
  title: 'Título',
  description: 'Descrição'
}) // Executa durante SSR
</script>
```

#### 3. Conteúdo SEO em `<ClientOnly>`
```vue
<!-- ❌ PROIBIDO -->
<template>
  <ClientOnly>
    <h1>Título principal do site</h1> <!-- Invisível para bots! -->
    <FAQ :items="faqs" /> <!-- Schema não indexado! -->
  </ClientOnly>
</template>
```

```vue
<!-- ✅ CORRETO -->
<template>
  <h1>Título principal do site</h1>
  <FAQ :items="faqs" />

  <ClientOnly>
    <ChatWidget /> <!-- Apenas widgets não-SEO -->
  </ClientOnly>
</template>
```

#### 4. Dados Não-Factuais (GEO)
```vue
<!-- ❌ PROIBIDO -->
<template>
  <p>Somos a melhor empresa do mercado!</p> <!-- Não citável por LLMs -->
  <p>Milhares de clientes satisfeitos</p> <!-- Sem fonte -->
</template>
```

```vue
<!-- ✅ CORRETO -->
<template>
  <p>Premiados como Melhor SaaS 2025 pela TechCrunch
     <a href="https://techcrunch.com/awards/2025">(fonte)</a>
  </p>
  <p>+5.000 empresas ativas (dados internos, Jan/2026)</p>
</template>
```

### 📊 Checklist de Performance

Antes de cada deploy, verificar:

- [ ] **Bundle CSS**: < 10KB (verificar em build)
- [ ] **Zero `<style>` sections**: Exceto animações complexas
- [ ] **Meta tags SSR**: `useSeoMeta()` no escopo principal
- [ ] **Schema único**: Organization apenas em `app.vue`
- [ ] **Imagens otimizadas**: `loading="lazy"` + formatos WebP/AVIF
- [ ] **Dados factuais**: Fontes citadas para claims importantes
- [ ] **Lighthouse Performance**: 90+/100 em build de produção

---

## 🐛 Troubleshooting Comum

### Problema: Schema não aparece no Nuxt DevTools
**Sintoma**: Aba SEO mostra "No schema detected"

**Causas possíveis**:
1. Schema definido em componente client-side (`onMounted`)
2. Schema definido em `<ClientOnly>` wrapper
3. Erro de sintaxe no JSON-LD

**Solução**:
```vue
<!-- ❌ ERRADO -->
<script setup lang="ts">
onMounted(() => {
  useSchemaOrg([...]) // Tarde demais - SSR já passou!
})
</script>

<!-- ✅ CORRETO -->
<script setup lang="ts">
useSchemaOrg([...]) // Executa durante SSR
</script>
```

---

### Problema: Meta tags vazias no View Source
**Sintoma**: `Ctrl+U` mostra HTML sem conteúdo ou meta tags

**Causa**: SSR desabilitado ou `useHead()` executado apenas no client

**Solução**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // ← Verificar se está true!
})
```

```vue
<!-- ❌ ERRADO -->
<script>
export default {
  mounted() {
    useHead({ title: 'Título' }) // Client-side only!
  }
}
</script>

<!-- ✅ CORRETO -->
<script setup lang="ts">
useSeoMeta({ title: 'Título' }) // SSR-friendly
</script>
```

---

### Problema: Lighthouse Performance baixo em localhost
**Sintoma**: Score de 40-60 em dev mode

**Causa**: Dev mode não está otimizado (sourcemaps, HMR, etc.)

**Solução**: **Isso é normal!** Testar em production build:
```bash
npm run build
npm run preview
# Executar Lighthouse novamente - deve subir para 90+
```

---

### Problema: OG Image não carrega
**Sintoma**: Teste de Open Graph mostra imagem quebrada

**Causas possíveis**:
1. Caminho relativo em vez de absoluto
2. CORS bloqueando
3. Imagem muito grande (>8MB)

**Solução**:
```vue
<!-- ❌ ERRADO -->
<script setup lang="ts">
useSeoMeta({
  ogImage: '/og-image.png' // Caminho relativo!
})
</script>

<!-- ✅ CORRETO -->
<script setup lang="ts">
const siteConfig = useSiteConfig()
useSeoMeta({
  ogImage: `${siteConfig.url}/og-image.png` // Absoluto
})
</script>
```

---

### Problema: Robots.txt não está sendo respeitado
**Sintoma**: Bots ignoram diretivas de bloqueio

**Causa**: `robots.txt` não está na raiz pública ou está malformado

**Verificação**:
```bash
# Deve retornar o conteúdo do robots.txt
curl http://localhost:3000/robots.txt
```

**Solução**: O módulo `@nuxtjs/robots` gera automaticamente. Verificar configuração:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  robots: {
    groups: [{
      userAgent: '*',
      disallow: ['/admin'] // Verificar sintaxe
    }]
  }
})
```

---

### Problema: Sitemap não atualiza com novas páginas
**Sintoma**: `/sitemap.xml` não lista página recém-criada

**Causa**: Sitemap gerado estaticamente no build

**Solução**: Para conteúdo dinâmico (ex: blog), usar `urls` hook:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  sitemap: {
    urls: async () => {
      // Buscar posts do CMS/API
      const posts = await $fetch('/api/posts')
      return posts.map(post => ({
        loc: `/blog/${post.slug}`,
        lastmod: post.updatedAt,
        priority: 0.8
      }))
    }
  }
})
```

---

## 📚 Referências de Autoridade

### Documentação Oficial
- **Nuxt SEO (BÍBLIA do projeto)**: https://nuxtseo.com/
  - Guia de instalação: https://nuxtseo.com/getting-started/installation
  - API Reference: https://nuxtseo.com/api
- **Nuxt 3**: https://nuxt.com/docs
  - SSR Guide: https://nuxt.com/docs/guide/concepts/rendering
- **Schema.org**: https://schema.org/docs/documents.html
  - Validator: https://validator.schema.org/

### Papers e Pesquisas Acadêmicas
- **GEO Research**: "Generative Engines and the Future of Search"
  - Link: https://arxiv.org/abs/2401.16854
  - Resumo: Estudo sobre como LLMs buscam e citam informações
- **AEO Best Practices**: Moz Guide to Answer Engine Optimization
  - Link: https://moz.com/learn/seo/answer-engine-optimization

### Ferramentas de Validação
- **Schema Validator**: https://validator.schema.org/
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Open Graph Debugger**: https://www.opengraph.xyz/
- **Core Web Vitals**: https://web.dev/vitals/
- **PageSpeed Insights**: https://pagespeed.web.dev/

### Comunidade e Suporte
- **Nuxt Discord**: https://discord.com/invite/nuxt
- **GitHub Discussions**: https://github.com/nuxt/nuxt/discussions
- **Nuxt SEO GitHub**: https://github.com/harlan-zw/nuxt-seo

---

## 🎯 Métricas de Sucesso

### Curto Prazo (1-3 meses)

#### Métricas Técnicas
- [ ] **Lighthouse SEO Score**: 100/100 em todas as páginas
- [ ] **Lighthouse Performance**: 90+/100 em produção
- [ ] **Core Web Vitals**:
  - [ ] LCP (Largest Contentful Paint): < 2.5s
  - [ ] FID (First Input Delay): < 100ms
  - [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] **Schema.org Validation**: 100% sem erros
- [ ] **Indexação**: 100% das páginas indexadas no Google (verificar via Search Console)

#### Métricas de AEO
- [ ] **Rich Results**: Elegível em 80%+ das páginas
- [ ] **Featured Snippet**: Conquistar pelo menos 1 em termo-chave relevante
- [ ] **People Also Ask**: Aparecer em 3+ caixas de perguntas relacionadas

---

### Médio Prazo (3-6 meses)

#### Métricas de Visibilidade
- [ ] **Tráfego Orgânico**: Crescimento de 50%+ em relação ao baseline
- [ ] **Featured Snippets**: 3-5 conquistas em termos-chave do nicho
- [ ] **Click-Through Rate (CTR)**: 5-8% médio no Search Console
- [ ] **Impressões**: Crescimento de 100%+ (dobrar visibilidade)

#### Métricas de GEO
- [ ] **Citações em Perplexity**: Aparecer como fonte em 30%+ das queries testadas
- [ ] **Menções em ChatGPT**: Ser citado em 20%+ dos prompts relacionados ao nicho
- [ ] **Knowledge Panel**: Aparecer no Knowledge Panel do Google para busca de marca

---

### Longo Prazo (6-12 meses)

#### Métricas de Autoridade
- [ ] **Domain Authority**: Aumentar DA em 10+ pontos (Ahrefs/Moz)
- [ ] **Backlinks**: 50+ backlinks de qualidade (DR 40+)
- [ ] **Tráfego Orgânico**: Crescimento de 200%+ em relação ao baseline
- [ ] **Conversões Orgânicas**: 30%+ das conversões vindas de busca orgânica

#### Métricas de GEO Avançadas
- [ ] **Citação Primária**: Ser a primeira fonte citada em 10%+ das respostas de LLMs
- [ ] **Múltiplos LLMs**: Aparecer em ChatGPT, Perplexity, Gemini e Claude
- [ ] **Reconhecimento de Marca**: Aumento de 50%+ em buscas diretas pela marca

---

## 🚀 Estrutura de Pastas Recomendada

```
projeto-nuxt-seo/
├── .nuxt/                    # Gerado automaticamente (não commitar)
├── node_modules/             # Dependências (não commitar)
├── public/                   # Arquivos estáticos
│   ├── favicon.ico
│   ├── logo.svg
│   └── og-default.png        # OG Image padrão
├── components/
│   ├── seo/
│   │   ├── FAQ.vue           # Componente de FAQ com schema
│   │   ├── Breadcrumb.vue    # Breadcrumbs com schema
│   │   └── HowToGuide.vue    # Guia passo-a-passo com schema
│   └── ui/
│       ├── Hero.vue
│       ├── Features.vue
│       └── CTA.vue
├── composables/
│   ├── useSEO.ts             # Helper customizado para SEO
│   └── useStructuredData.ts  # Helper para Schema.org
├── layouts/
│   └── default.vue           # Layout padrão com estrutura base
├── pages/
│   ├── index.vue             # Home page
│   ├── about.vue             # Página sobre
│   └── blog/
│       └── [slug].vue        # Artigos dinâmicos
├── server/
│   └── api/
│       └── posts.ts          # API para blog posts (exemplo)
├── app.vue                   # Root component (Organization schema aqui)
├── app.config.ts             # Configuração de conteúdo
├── nuxt.config.ts            # Configuração técnica do Nuxt
├── package.json
├── tsconfig.json
├── tailwind.config.ts        # Configuração do Tailwind (OBRIGATÓRIO)
├── README.md                 # Documentação do projeto
├── skills.md                 # Skills para IA - LEIA PRIMEIRO
├── Context.md                # Contexto do projeto (este arquivo)
└── Docs.md                   # Referências técnicas curadas
```

---

## 💡 Composable Helper Customizado (Exemplo)

```typescript name=composables/useSEO.ts
/**
 * Helper customizado para configurar SEO de páginas
 * Centraliza lógica de meta tags e evita repetição
 */
export const useSEO = (options: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
  }
}) => {
  const siteConfig = useSiteConfig()
  const route = useRoute()

  // Construir URL completa da página
  const pageUrl = `${siteConfig.url}${route.path}`

  // Imagem padrão se não fornecida
  const ogImage = options.image || `${siteConfig.url}/og-default.png`

  // Configurar meta tags
  useSeoMeta({
    // Basic meta
    title: `${options.title} - ${siteConfig.name}`,
    description: options.description,

    // Open Graph
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: ogImage,
    ogType: options.type || 'website',
    ogUrl: pageUrl,
    ogSiteName: siteConfig.name,

    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: ogImage,

    // Article specific (se aplicável)
    ...(options.type === 'article' && options.article && {
      articlePublishedTime: options.article.publishedTime,
      articleModifiedTime: options.article.modifiedTime,
      articleAuthor: options.article.author
    })
  })

  // Retornar dados para uso opcional no template
  return {
    pageUrl,
    ogImage,
    fullTitle: `${options.title} - ${siteConfig.name}`
  }
}
```

**Uso do composable**:
```vue
<!-- pages/index.vue -->
<script setup lang="ts">
useSEO({
  title: 'Início',
  description: 'Landing page moderna otimizada para AEO e GEO',
  type: 'website'
})
</script>
```

---

## 📝 Exemplo de Página Completa Otimizada

```vue name=pages/index.vue
<script setup lang="ts">
// SEO Meta Tags
useSEO({
  title: 'Início',
  description: 'Solução completa de SEO, AEO e GEO com Nuxt 3. Apareça no Google, ChatGPT e Perplexity.',
  type: 'website'
})

// Schema.org - Organization (já definido no app.vue, então apenas WebPage aqui)
const siteConfig = useSiteConfig()

useSchemaOrg([
  defineWebPage({
    '@id': `${siteConfig.url}/#webpage`,
    name: 'Home - Landing Page Moderna',
    description: 'Landing page otimizada para motores de busca e IAs generativas'
  })
])

// Dados do FAQ (para componente)
const faqs = [
  {
    question: 'O que é Nuxt SEO?',
    answer: 'Nuxt SEO é um conjunto de módulos oficiais para otimização de sites Nuxt 3, incluindo sitemap, robots.txt, Schema.org e OG images.'
  },
  {
    question: 'Como Nuxt ajuda no GEO?',
    answer: 'Nuxt 3 com SSR garante que IAs generativas como ChatGPT leiam dados estruturados via Schema.org, aumentando chances de citação.'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          Landing Page Otimizada para IA
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl">
          Apareça no Google, ChatGPT e Perplexity com Nuxt 3 e @nuxtjs/seo
        </p>
        <NuxtLink
          to="/sobre"
          class="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Saiba Mais
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section com Dados Factuais (GEO) -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">Por que Nuxt 3?</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-bold mb-3 text-gray-900">SSR Nativo</h3>
            <p class="text-gray-700 leading-relaxed">Renderização no servidor garante que bots e IAs leiam conteúdo completo instantaneamente.</p>
            <p class="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <strong>Performance:</strong> LCP < 2.5s (fonte: nuxt.com)
            </p>
          </div>

          <div class="p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-bold mb-3 text-gray-900">Schema.org Automático</h3>
            <p class="text-gray-700 leading-relaxed">Geração de JSON-LD via composables para maximizar elegibilidade em Rich Results.</p>
            <p class="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <strong>Impacto:</strong> +30% CTR com rich snippets
            </p>
          </div>

          <div class="p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-bold mb-3 text-gray-900">Edge Computing</h3>
            <p class="text-gray-700 leading-relaxed">Nitro engine permite deploy em Edge (Cloudflare, Vercel) com latência < 50ms.</p>
            <p class="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <strong>Alcance:</strong> Global via CDN
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section (AEO) -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <FAQ :faqs="faqs" />
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-16 bg-primary-600 text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Pronto para ser citado por IAs?</h2>
        <p class="text-xl mb-8 opacity-90">Configure Nuxt SEO em menos de 5 minutos</p>
        <a
          href="https://nuxtseo.com/getting-started/installation"
          target="_blank"
          class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          Ver Documentação
        </a>
      </div>
    </section>
  </div>
</template>

<!-- ✅ ZERO <style> section - Tailwind classes apenas -->
```

---

## 🎯 Próximos Passos Recomendados

### 1. Setup Inicial (Semana 1)
1. [ ] Criar projeto Nuxt 3: `npx nuxi@latest init projeto-nuxt-seo`
2. [ ] Instalar @nuxtjs/seo: `npx nuxi@latest module add @nuxtjs/seo`
3. [ ] Configurar `nuxt.config.ts` com `site`, `robots`, `sitemap`
4. [ ] Criar `app.config.ts` com dados da marca
5. [ ] Definir Organization schema no `app.vue`

### 2. Desenvolvimento de Componentes (Semana 2-3)
1. [ ] Criar componente FAQ com FAQPage schema
2. [ ] Criar componente Breadcrumb com BreadcrumbList schema
3. [ ] Implementar página inicial com WebPage schema
4. [ ] Adicionar meta tags dinâmicas em todas as páginas
5. [ ] Configurar OG Images dinâmicas

### 3. Validação e Otimização (Semana 4)
1. [ ] Testar com Nuxt DevTools (aba SEO)
2. [ ] Validar Schema.org em validator.schema.org
3. [ ] Executar Lighthouse e atingir 95+ em SEO/Performance
4. [ ] Testar View Source para confirmar SSR
5. [ ] Verificar robots.txt e sitemap.xml

### 4. Deploy e Monitoramento (Semana 5)
1. [ ] Fazer build de produção: `npm run build`
2. [ ] Deploy em Vercel/Netlify
3. [ ] Configurar Google Search Console
4. [ ] Submeter sitemap
5. [ ] Monitorar indexação e Core Web Vitals

### 5. Testes de GEO (Após 2-4 semanas de indexação)
1. [ ] Testar queries em Perplexity.ai
2. [ ] Verificar citações em ChatGPT (modo Browsing)
3. [ ] Ajustar conteúdo baseado em resultados
4. [ ] Iterar e otimizar continuamente

---

## 📞 Suporte e Recursos Adicionais

### Precisa de Ajuda?
- **Nuxt Discord**: Canal #seo - https://discord.com/invite/nuxt
- **GitHub Issues**: https://github.com/harlan-zw/nuxt-seo/issues
- **Stack Overflow**: Tag `nuxt-seo` - https://stackoverflow.com/questions/tagged/nuxt-seo

### Recursos de Aprendizado
- **Nuxt SEO Playground**: https://nuxtseo.com/playground
- **Exemplos Oficiais**: https://github.com/harlan-zw/nuxt-seo/tree/main/examples
- **Blog do Harlan Wilton** (criador do Nuxt SEO): https://harlanzw.com/blog

---

**Última atualização**: Fevereiro 2026
**Versão do Documento**: 2.0
**Mantenedor**: [Seu Nome/Equipe]
**Licença**: MIT (ou conforme seu projeto)

---

## ✅ Resumo Executivo

Este documento fornece o contexto completo para desenvolvimento de uma Landing Page Nuxt 3 otimizada para:

1. ✅ **SEO Tradicional**: Lighthouse 100/100, Core Web Vitals excelentes
2. ✅ **AEO**: Featured Snippets via FAQ Schema e dados estruturados
3. ✅ **GEO**: Citações em ChatGPT/Perplexity via JSON-LD e grafos de conhecimento

**Tecnologias obrigatórias**:
- Nuxt 3.11+
- @nuxtjs/seo 2.x
- @nuxtjs/tailwindcss ^6.11.4 (ÚNICO framework CSS)

**Metas de Performance**:
- Bundle CSS: < 10KB
- Lighthouse SEO: 100/100
- Lighthouse Performance: 90+/100
- LCP: < 2.5s | CLS: < 0.1

**Validação**: Nuxt DevTools, Schema Validator, Lighthouse, Google Rich Results Test

**Métricas de sucesso**: Featured Snippets (3 meses), Citações em LLMs (6 meses), DA +10 pontos (12 meses)

**Pronto para uso com IA de desenvolvimento**: Combine com [skills.md](skills.md) (regras) e [Docs.md](Docs.md) (APIs) para orientação completa.
