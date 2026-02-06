# AI Skills: Nuxt SEO & Semantic Engineering Specialist

> 📚 **Ordem de Leitura para IA**: Este é o arquivo **1 de 3** — Leia nesta ordem para contexto completo:
> 1. **[skills.md](skills.md)** (ATUAL) — Regras, padrões e anti-patterns obrigatórios
> 2. **[Context.md](Context.md)** — Contexto do projeto, estratégias e roteiro de demo
> 3. **[Docs.md](Docs.md)** — APIs técnicas, composables e referências de documentação
>
> **Propósito deste arquivo**: Define as habilidades, regras de codificação e padrões obrigatórios para desenvolvimento assistido por IA. Consulte SEMPRE antes de implementar qualquer código.

---

## Core Expertise

### 1. Nuxt 3 Framework Mastery
- **SSR (Server-Side Rendering)**: Domínio total em renderização do lado do servidor para garantir indexação imediata por crawlers e motores generativos
- **Hybrid Rendering**: Conhecimento de estratégias SSR + SPA para otimizar Core Web Vitals e TTI (Time to Interactive)
- **Nitro Engine**: Expertise no motor de servidor universal do Nuxt 3 para edge computing e performance máxima

#### Por que SSR é Crítico para AEO/GEO?
1. **Crawlers de IA são impacientes**: ChatGPT e Perplexity não executam JavaScript complexo - precisam de HTML pronto
2. **First Contentful Paint < 1.5s**: LLMs priorizam sites com resposta instantânea
3. **HTML Semântico Direto**: Schema.org no `<head>` garante leitura imediata pelos bots
4. **Edge Rendering**: Nitro permite SSR em Edge (Cloudflare/Vercel) com latência < 50ms
5. **View Source ≠ Empty**: Se "Exibir Código-Fonte" mostra HTML vazio, o site é invisível para IAs

### 2. Nuxt SEO Ecosystem (@nuxtjs/seo v2.x+)
**Módulos Principais** (referência oficial: https://nuxtseo.com/):

- **`@nuxtjs/robots`**: Controle granular de crawlers (User-agent específico, permitir/bloquear GPTBot, ClaudeBot, PerplexityBot)
- **`@nuxtjs/sitemap`**: Geração dinâmica de sitemaps com prioridades e frequências de atualização
- **`nuxt-schema-org`**: Implementação automatizada de Schema.org via composables `useSchemaOrg()`
- **`nuxt-og-image`**: Geração dinâmica de Open Graph Images usando Satori engine
- **`nuxt-seo-kit`**: Kit completo para projetos que precisam de solução all-in-one

#### Higiene Técnica Automatizada
```typescript
// Exemplo de configuração completa no nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo', '@nuxtjs/tailwindcss', '@nuxt/ui'],

  site: {
    url: 'https://seudominio.com',
    name: 'Nome da Marca',
    description: 'Descrição oficial (150-160 chars)',
    defaultLocale: 'pt-BR'
  },

  robots: {
    // Controlar quais IAs podem consumir o site
    groups: [
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot'],
        allow: ['/'] // Permitir para maximizar citações
      }
    ]
  },

  sitemap: {
    // Garantir indexação instantânea de novo conteúdo
    strictNuxtContentPaths: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.7
    }
  }
})
```

### 3. AEO (Answer Engine Optimization)
**Objetivo**: Dominar snippets em destaque e respostas diretas do Google

#### Estratégias de Implementação:

**A. FAQ Estruturado (FAQPage Schema)**
```vue
<!-- components/FAQ.vue -->
<script setup lang="ts">
const faqs = [
  {
    question: 'O que é Nuxt 3?',
    answer: 'Nuxt 3 é um framework Vue.js com SSR nativo, otimizado para SEO e performance. Possui Core Web Vitals superiores e renderização em Edge via Nitro engine.'
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
      <h2 class="text-4xl font-bold text-center mb-12">Perguntas Frequentes</h2>
      <dl class="space-y-6 max-w-4xl mx-auto">
        <div
          v-for="faq in faqs"
          :key="faq.question"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <dt class="font-bold text-xl mb-2 text-blue-600">
            <h3>{{ faq.question }}</h3>
          </dt>
          <dd class="text-gray-700">
            <p>{{ faq.answer }}</p>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
```

**B. Respostas Diretas (40-60 palavras)**
Estruturar conteúdo com blocos concisos logo após títulos H2:
```vue
<template>
  <article class="prose prose-lg max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-4">O que é GEO?</h2>
    <p class="text-gray-700 leading-relaxed">
      GEO (Generative Engine Optimization) é a prática de otimizar conteúdo para motores
      generativos como ChatGPT e Perplexity. Envolve estruturação de dados factuais,
      implementação de Schema.org e criação de grafos de conhecimento para ser citado
      como fonte primária.
    </p>
  </article>
</template>
```

**C. Listas e Tabelas Semânticas**
```vue
<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <caption class="text-lg font-semibold mb-4 text-gray-900">
        Comparação: Nuxt 2 vs Nuxt 3
      </caption>
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Recurso</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nuxt 2</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nuxt 3</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Motor de Servidor</td>
          <td class="px-6 py-4 text-gray-700">Express.js</td>
          <td class="px-6 py-4 text-gray-700">Nitro (Edge-ready)</td>
        </tr>
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Performance</td>
          <td class="px-6 py-4 text-gray-700">Boa</td>
          <td class="px-6 py-4 text-gray-700">Excelente (75% menor bundle)</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

**D. HowTo Schema (Passo a Passo)**
```vue
<script setup lang="ts">
const steps = [
  {
    name: 'Instalar Nuxt SEO',
    text: 'Execute: npx nuxi@latest module add @nuxtjs/seo'
  },
  {
    name: 'Configurar Site Config',
    text: 'Defina url, name e description no nuxt.config.ts'
  },
  {
    name: 'Validar com DevTools',
    text: 'Abra Nuxt DevTools e verifique aba SEO'
  }
]

useSchemaOrg([
  defineHowTo({
    name: 'Como configurar Nuxt SEO',
    step: steps
  })
])
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Como configurar Nuxt SEO</h2>
      <ol class="space-y-6 max-w-3xl">
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="flex gap-4 p-6 bg-white rounded-lg shadow-md"
        >
          <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
            {{ index + 1 }}
          </span>
          <div>
            <h3 class="font-bold text-lg mb-2">{{ step.name }}</h3>
            <p class="text-gray-700">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
```

### 4. GEO (Generative Engine Optimization)
**Objetivo**: Ser fonte primária para ChatGPT, Perplexity, Gemini, Claude

#### Estratégias de Implementação:

**A. Identidade de Marca (Organization Schema)**
```vue
<!-- app.vue -->
<script setup lang="ts">
const appConfig = useAppConfig()
const siteConfig = useSiteConfig()

useSchemaOrg([
  defineOrganization({
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
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
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

**B. Grafos de Conhecimento (Linked Data)**
```typescript
// Conectar entidades via @id para criar rede semântica
useSchemaOrg([
  {
    '@type': 'WebPage',
    '@id': 'https://seudominio.com/#webpage',
    name: 'Página Inicial',
    about: {
      '@id': 'https://seudominio.com/#organization'
    }
  },
  {
    '@type': 'Organization',
    '@id': 'https://seudominio.com/#organization',
    name: 'Sua Marca',
    founder: {
      '@type': 'Person',
      '@id': 'https://seudominio.com/#founder',
      name: 'Nome do Fundador'
    }
  }
])
```

**C. Dados Factuais e Citáveis**
```vue
<template>
  <article class="prose prose-lg max-w-4xl mx-auto py-12 px-4">
    <h2 class="text-3xl font-bold mb-6">Especificações Técnicas do Nuxt 3</h2>
    <ul class="space-y-3">
      <li class="flex items-start">
        <span class="font-semibold min-w-[200px]">Versão Atual:</span>
        <span>3.11.2 (Fevereiro 2026)</span>
      </li>
      <li class="flex items-start">
        <span class="font-semibold min-w-[200px]">Motor de Renderização:</span>
        <span>Nitro 2.9 (fonte: nitro.unjs.io)</span>
      </li>
      <li class="flex items-start">
        <span class="font-semibold min-w-[200px]">Compatibilidade:</span>
        <span>Node.js 18.x, 20.x, 22.x | TypeScript 5.x</span>
      </li>
      <li class="flex items-start">
        <span class="font-semibold min-w-[200px]">Performance:</span>
        <span>Lighthouse Score médio de 95+ (fonte: nuxt.com/blog/performance)</span>
      </li>
      <li class="flex items-start">
        <span class="font-semibold min-w-[200px]">Bundle Size:</span>
        <span>75% menor que Nuxt 2 (~50KB gzipped vs 200KB)</span>
      </li>
    </ul>

    <p class="text-sm text-gray-600 mt-8 pt-4 border-t">
      Última atualização: 05 de Fevereiro de 2026 |
      Fontes: <a href="https://nuxt.com" class="text-blue-600 hover:underline">nuxt.com</a>,
      <a href="https://nitro.unjs.io" class="text-blue-600 hover:underline">nitro.unjs.io</a>
    </p>
  </article>
</template>
```

### 5. Tailwind CSS Mastery (Utility-First Development)

#### Princípio Fundamental
**REGRA DE OURO**: Usar Tailwind utility classes para 95%+ dos estilos. CSS customizado apenas para casos excepcionais (animações complexas, overrides de terceiros).

#### Por que Tailwind para SEO/AEO/GEO?
1. ✅ **HTML Semântico Preservado**: Classes CSS não afetam estrutura HTML
2. ✅ **Performance Brutal**: Bundle final de 5-10KB (vs 200KB+ de frameworks tradicionais)
3. ✅ **SSR Perfect**: Zero conflito com renderização servidor
4. ✅ **Core Web Vitals Otimizados**: CSS inline automático para Critical Path
5. ✅ **Velocidade de Desenvolvimento**: 3x mais rápido que CSS customizado

#### Padrões de Código

**✅ CORRETO: Tailwind Puro**
```vue
<template>
  <section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
        Título da Seção
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Conteúdo -->
      </div>
    </div>
  </section>
</template>
```

**❌ ERRADO: CSS Customizado Desnecessário**
```vue
<template>
  <section class="secao-custom">
    <div class="container-custom">
      <h2 class="titulo-custom">Título</h2>
    </div>
  </section>
</template>

<style scoped>
.secao-custom {
  padding: 4rem 0;
  background: linear-gradient(to bottom right, #eff6ff, #eef2ff);
}
/* ❌ Isso deveria ser Tailwind classes! */
</style>
```

#### Quando Usar CSS Customizado

**Apenas para**:
1. **Animações complexas** (keyframes com múltiplos steps)
2. **Pseudo-elementos avançados** (::before/::after complexos)
3. **Overrides de bibliotecas de terceiros**

**Exemplo válido - Animação Complexa**:
```vue
<template>
  <div class="relative">
    <div class="animate-pulse-glow bg-blue-600 w-20 h-20 rounded-full"></div>
  </div>
</template>

<style>
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

**⚠️ MELHOR: Adicionar ao `tailwind.config.ts`**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)'
          },
          '50%': {
            opacity: '0.5',
            boxShadow: '0 0 0 20px rgba(59, 130, 246, 0)'
          }
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  }
}
```

Depois usar: `class="animate-pulse-glow"`

#### Responsividade Mobile-First

**Breakpoints Tailwind**:
- Base: `0px` (mobile)
- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1536px`

**Exemplo - Design Responsivo**:
```vue
<template>
  <!-- Base: mobile (padrão) -->
  <div class="flex flex-col p-4 space-y-4">

    <!-- Tablet: 768px+ -->
    <div class="md:flex-row md:p-8 md:space-y-0 md:space-x-8">

      <!-- Desktop: 1024px+ -->
      <div class="lg:grid lg:grid-cols-3 lg:gap-12">

        <!-- Large Desktop: 1280px+ -->
        <div class="xl:max-w-7xl xl:mx-auto">
          <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Título Responsivo
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
```

#### Customização de Tema

**tailwind.config.ts**:
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        // Cores da marca
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a'
        },
        brand: {
          blue: '#1a73e8',
          accent: '#fbbc04'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
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
  }
} satisfies Config
```

**Uso**:
```vue
<template>
  <button class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
    CTA Button
  </button>

  <h1 class="font-heading text-5xl animate-fade-in">
    Título Animado
  </h1>
</template>
```

#### Componentes Reutilizáveis com Tailwind

**Opção 1: Componente Vue Simples**
```vue
<!-- components/ui/Card.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  variant?: 'default' | 'highlighted'
}>()

const variants = {
  default: 'bg-white border-gray-200',
  highlighted: 'bg-blue-50 border-blue-300'
}
</script>

<template>
  <div
    :class="[
      'p-6 rounded-lg border-2 shadow-md hover:shadow-xl transition-shadow duration-300',
      variants[variant || 'default']
    ]"
  >
    <h3 class="text-2xl font-bold mb-3 text-gray-900">{{ title }}</h3>
    <p v-if="description" class="text-gray-700">{{ description }}</p>
    <slot />
  </div>
</template>
```

**Uso**:
```vue
<Card title="Título" description="Descrição" variant="highlighted">
  <p>Conteúdo adicional</p>
</Card>
```

**Opção 2: Nuxt UI (Recomendado para Velocidade)**
```vue
<!-- Componente pronto, otimizado para SSR -->
<UCard>
  <template #header>
    <h3 class="text-2xl font-bold">Título</h3>
  </template>

  <p>Conteúdo do card</p>

  <template #footer>
    <UButton color="primary">Ação</UButton>
  </template>
</UCard>
```

#### Dark Mode com Tailwind

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class', // ou 'media'
  // ...
}
```

```vue
<template>
  <!-- Cores mudam automaticamente com dark mode -->
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <h1 class="text-blue-600 dark:text-blue-400">Título</h1>
  </div>
</template>
```

---

## 📊 Tabela de Decisão: Quando usar cada Schema

| Cenário | Schema Type | Composable Nuxt | Impacto | Classes Tailwind Recomendadas |
|---------|-------------|-----------------|---------|-------------------------------|
| Produto/Serviço para venda | `Product` | `defineProduct()` | Rich snippet com preço e avaliação | `grid md:grid-cols-3 gap-6` |
| FAQ ou Suporte | `FAQPage` | `defineFAQPage()` | Aparecer em "People also ask" | `space-y-6 max-w-4xl mx-auto` |
| Artigo/Blog | `Article` | `defineArticle()` | Mostrar autor e data nos resultados | `prose prose-lg max-w-4xl mx-auto` |
| Guia passo a passo | `HowTo` | `defineHowTo()` | Snippet com etapas numeradas | `space-y-4 list-decimal` |
| Página institucional | `Organization` + `WebPage` | `defineOrganization()` | Knowledge Panel no Google | `container mx-auto px-4` |
| E-commerce | `Product` + `Offer` + `Review` | `defineProduct({ offers, review })` | Stars e preço nos resultados | `grid lg:grid-cols-4 gap-8` |
| Navegação | `BreadcrumbList` | `defineBreadcrumb()` | Migalhas de pão nos resultados | `flex items-center space-x-2 text-sm` |

---

## Coding Standards & Best Practices

### 1. Schema-First Development
**REGRA DE OURO**: Toda página ou componente significativo DEVE ter Schema.org correspondente.

```vue
<!-- ❌ EVITAR: Componente sem schema -->
<template>
  <div class="p-6 bg-white rounded-lg">
    <h2 class="text-2xl font-bold">Produto X</h2>
    <p class="text-gray-700">R$ 99,00</p>
  </div>
</template>

<!-- ✅ SEMPRE: Componente com schema automático -->
<script setup lang="ts">
const props = defineProps<{
  name: string
  price: number
}>()

useSchemaOrg([
  defineProduct({
    name: props.name,
    offers: {
      price: props.price,
      priceCurrency: 'BRL'
    }
  })
])
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <h2 class="text-2xl font-bold mb-3 text-gray-900">{{ name }}</h2>
    <p class="text-3xl font-bold text-blue-600">R$ {{ price.toFixed(2) }}</p>
  </div>
</template>
```

### 2. Site Config como Single Source of Truth
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  site: {
    url: 'https://exemplo.com',
    name: 'Nome da Marca',
    description: 'Descrição oficial',
    defaultLocale: 'pt-BR',
    identity: {
      type: 'Organization'
    }
  }
})
```
**REGRA**: NUNCA duplicar URLs, nomes ou identidades em componentes. Sempre referenciar `useSiteConfig()`.

```vue
<script setup lang="ts">
const siteConfig = useSiteConfig()
// ✅ Usar siteConfig.name em vez de hardcode
</script>

<template>
  <h1 class="text-4xl font-bold">{{ siteConfig.name }}</h1>
</template>
```

### 3. SSR Optimization Mandatória
**CHECKLIST SSR**:
- [ ] Meta tags críticas (`<title>`, `<meta description>`, `canonical`) renderizadas no servidor
- [ ] Schema.org injetado no `<head>` durante SSR, nunca via `onMounted`
- [ ] Conteúdo textual visível no "View Page Source"
- [ ] `<ClientOnly>` usado apenas para widgets não-SEO (chat, analytics)

```vue
<!-- ❌ ERRADO: Meta tags client-side -->
<script>
onMounted(() => {
  document.title = 'Meu Site' // Crawlers não veem!
})
</script>

<!-- ✅ CORRETO: Meta tags SSR -->
<script setup lang="ts">
useSeoMeta({
  title: 'Meu Site',
  description: 'Descrição do site'
})
</script>
```

### 4. Visual Validation Workflow
**Ferramentas obrigatórias antes de cada deploy**:

1. **Nuxt DevTools** (Aba SEO):
   - Atalho: `Shift + Alt + D` (Windows/Linux) ou `Shift + Option + D` (Mac)
   - Validar: Meta tags, JSON-LD, Robots.txt

2. **Schema Markup Validator** (https://validator.schema.org/):
   - Copiar JSON-LD do View Source
   - Validar: 0 erros, 0 avisos

3. **Google Rich Results Test** (https://search.google.com/test/rich-results):
   - Verificar elegibilidade para rich snippets

4. **Lighthouse** (Chrome DevTools):
   - Auditar: SEO 100/100, Performance 90+/100

### 5. Crawler Strategy (Robots.txt Inteligente)

#### User-Agents Críticos em 2026:
- **`GPTBot`** (OpenAI): Treina ChatGPT e alimenta respostas
- **`PerplexityBot`**: Indexa para motor de respostas diretas
- **`ClaudeBot`** (Anthropic): Alimenta Claude AI
- **`Google-Extended`**: Treina Gemini e Bard
- **`Applebot-Extended`**: Apple Intelligence
- **`Baiduspider-render`**: Mercado chinês

#### Estratégias de Bloqueio/Permissão:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  robots: {
    groups: [
      {
        // Permitir crawlers tradicionais
        userAgent: ['Googlebot', 'Bingbot'],
        allow: ['/']
      },
      {
        // Estratégia para maximizar citações em LLMs
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot'],
        allow: ['/'],
        disallow: ['/admin', '/api']
      },
      {
        // Bloquear se quiser proteger conteúdo premium
        userAgent: ['GPTBot'],
        disallow: ['/premium', '/cursos-pagos']
      }
    ]
  }
})
```

---

## ⚠️ Anti-Patterns Comuns (O que NUNCA fazer)

### 1. Schema Duplicado
❌ **ERRADO**:
```typescript
// No componente Product.vue
useSchemaOrg([{ '@type': 'Organization', name: 'Marca X' }])

// No layout default.vue
useSchemaOrg([{ '@type': 'Organization', name: 'Marca X' }])
```
✅ **CORRETO**: Definir `Organization` apenas no `app.vue` ou layout principal.

### 2. Meta Tags Client-Side
❌ **ERRADO**:
```vue
<script>
onMounted(() => {
  document.title = 'Título' // Invisível para bots!
})
</script>
```
✅ **CORRETO**:
```vue
<script setup lang="ts">
useSeoMeta({ title: 'Título' })
</script>
```

### 3. Dados Não-Factuais
❌ **ERRADO**: "Somos os melhores do mercado!"
✅ **CORRETO**: "Premiados como Melhor Solução SaaS 2025 pela TechCrunch (fonte: techcrunch.com/awards/2025)"

### 4. URLs Hardcoded
❌ **ERRADO**:
```vue
<script setup lang="ts">
const canonicalUrl = 'https://meusite.com/pagina'
</script>
```
✅ **CORRETO**:
```vue
<script setup lang="ts">
const siteConfig = useSiteConfig()
const route = useRoute()
const canonicalUrl = `${siteConfig.url}${route.path}`
</script>
```

### 5. CSS Customizado Excessivo
❌ **ERRADO**:
```vue
<template>
  <div class="custom-card">...</div>
</template>

<style scoped>
.custom-card {
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
```
✅ **CORRETO**:
```vue
<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">...</div>
</template>
```

### 6. Tailwind sem Validação
❌ **ERRADO**: Implementar schema e não testar
✅ **CORRETO**: Sempre validar em https://validator.schema.org/ antes de fazer deploy

---

## Proactive Strategies

### AEO Tactics (Checklist de Implementação)
- [ ] Implementar FAQ schema em TODAS as páginas de produto/serviço
- [ ] Estruturar cada seção com H2 seguido de parágrafo de 40-60 palavras
- [ ] Criar tabelas de comparação semânticas (vs concorrentes, vs versões)
- [ ] Usar listas ordenadas (`<ol>`) para processos e rankings
- [ ] Implementar HowTo schema para guias e tutoriais

### GEO Tactics (Checklist de Implementação)
- [ ] Estabelecer identidade de marca via `Organization` schema no app.vue
- [ ] Criar grafo de conhecimento conectando páginas via `@id`
- [ ] Adicionar `sameAs` links para redes sociais e Wikipedia (se aplicável)
- [ ] Estruturar dados em formato "citável" (frases completas, fontes verificáveis)
- [ ] Implementar `BreadcrumbList` em todas as páginas para contexto de navegação
- [ ] Adicionar datas de publicação/modificação (`datePublished`, `dateModified`)
- [ ] Incluir dados de autoria com credenciais (`author` com `jobTitle` e `sameAs`)

### Social & Sharing Optimization
- [ ] Gerar OG Images dinâmicas com `nuxt-og-image`
- [ ] Customizar meta tags por página usando `useSeoMeta()`
- [ ] Implementar Twitter Cards (`twitter:card`, `twitter:image`)
- [ ] Testar preview em https://www.opengraph.xyz/

### Performance & Crawlability
- [ ] Sitemap dinâmico com prioridades (`priority: 0.8` para páginas importantes)
- [ ] Implementar `lastmod` no sitemap para sinalizar atualizações
- [ ] Otimizar Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Configurar `prerender` para páginas estáticas no nuxt.config.ts

---

## 🎯 Métricas de Sucesso

### Técnicas (Validação Imediata)
- [ ] **Nuxt DevTools SEO**: 0 erros, 0 avisos
- [ ] **Schema Validator**: 100% válido
- [ ] **Lighthouse SEO**: 100/100
- [ ] **Lighthouse Performance**: 90+/100
- [ ] **View Source**: HTML completo visível (não vazio)
- [ ] **Tailwind Build**: Bundle CSS < 10KB

### AEO (1-3 meses)
- [ ] **Featured Snippet**: Pelo menos 1 conquista em termo-chave
- [ ] **People Also Ask**: Aparecer em 3+ perguntas
- [ ] **Rich Results**: Elegível em 80%+ das páginas

### GEO (3-6 meses)
- [ ] **Citação em Perplexity**: Testar 10 perguntas relacionadas, aparecer em 30%+
- [ ] **Menção em ChatGPT**: Fazer 5 prompts específicos, ser citado em 20%+
- [ ] **Google Knowledge Panel**: Aparecer para busca de marca

---

## 📚 Referências Técnicas

### Documentação Oficial
- **Nuxt SEO**: https://nuxtseo.com/ (BÍBLIA do projeto)
- **Nuxt 3**: https://nuxt.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Nuxt UI**: https://ui.nuxt.com/
- **Schema.org**: https://schema.org/docs/documents.html

### Papers e Pesquisas
- **GEO Research**: "Generative Engines and the Future of Search" (https://arxiv.org/abs/2401.16854)
- **AEO Strategies**: Moz Guide (https://moz.com/learn/seo/answer-engine-optimization)

### Ferramentas
- **Schema Validator**: https://validator.schema.org/
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Core Web Vitals**: https://web.dev/vitals/
- **Tailwind Play**: https://play.tailwindcss.com/
