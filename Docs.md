# Technical Documentation Reference

> 📚 **Ordem de Leitura para IA**: Este é o arquivo **3 de 3** — Leia nesta ordem para contexto completo:
> 1. **[skills.md](skills.md)** — Regras, padrões e anti-patterns obrigatórios
> 2. **[Context.md](Context.md)** — Contexto do projeto, estratégias e roteiro de demo
> 3. **[Docs.md](Docs.md)** (ATUAL) — APIs técnicas, composables e referências de documentação
>
> **Propósito deste arquivo**: Contém referências curadas das documentações oficiais do Nuxt 3, Nuxt SEO e Tailwind CSS, focadas especificamente em AEO/GEO. NÃO é uma cópia completa - apenas APIs críticas para este projeto.

---

## 📦 Versões do Projeto

| Pacote | Versão | Link Oficial | Notas |
|--------|--------|--------------|-------|
| Nuxt | `^3.11.2` | https://nuxt.com/docs | Versão estável LTS |
| @nuxtjs/seo | `^2.0.0-rc.10` | https://nuxtseo.com | Release Candidate (stable) |
| @nuxtjs/tailwindcss | `^6.11.4` | https://tailwindcss.nuxtjs.org | **OBRIGATÓRIO** - Framework CSS único |
| Tailwind CSS | `^3.4.x` | https://tailwindcss.com | Utility-first CSS (auto-instalado) |
| Vue | `^3.4.x` | https://vuejs.org | Auto-instalado pelo Nuxt |
| Nitro | `^2.9.x` | https://nitro.unjs.io | Motor de servidor |

**Data de referência**: Fevereiro 2026

### ⚠️ Regra de Estilização (OBRIGATÓRIA)

| Aspecto | Decisão | Justificativa |
|---------|---------|---------------|
| **Framework CSS** | Tailwind CSS `^6.11.4` | Único framework - Bundle < 10KB, SSR perfeito |
| **CSS Customizado** | ❌ PROIBIDO (95% das vezes) | Apenas para animações complexas ou overrides |
| **UnoCSS** | ❌ NÃO USAR | Removido do projeto - padronização única |
| **Nuxt UI** | ❌ NÃO USAR | Priorizar bundle mínimo e controle total |

---

## 🔧 Nuxt 3 - Core APIs (Relevantes para SEO)

### 1. `useSeoMeta()` - Composable de Meta Tags

**Quando usar**: SEMPRE que precisar definir meta tags (título, descrição, OG tags).

**Documentação oficial**: https://nuxt.com/docs/api/composables/use-seo-meta

**Exemplo básico**:
```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Título da Página',
  description: 'Descrição de 150-160 caracteres',
  ogTitle: 'Título para Open Graph',
  ogDescription: 'Descrição para compartilhamento social',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
  twitterCard: 'summary_large_image'
})
</script>
```

**Vantagens sobre `useHead()`**:
- Syntax mais limpa e type-safe
- Renderização SSR automática
- Deduplicação automática de tags

**⚠️ Gotcha**: Não usar `onMounted` ou `watch` com `useSeoMeta` - executar diretamente no `<script setup>`.

---

### 2. `useSiteConfig()` - Configuração Global do Site

**Quando usar**: Para acessar URL, nome e outros dados globais definidos no `nuxt.config.ts`.

**Documentação oficial**: https://nuxtseo.com/site-config/guides/using-site-config

**Exemplo**:
```vue
<script setup lang="ts">
const siteConfig = useSiteConfig()

console.log(siteConfig.url)   // https://exemplo.com
console.log(siteConfig.name)  // Nome da Marca
</script>
```

**Configuração no nuxt.config.ts**:
```typescript
export default defineNuxtConfig({
  site: {
    url: 'https://exemplo.com',
    name: 'Nome da Marca',
    description: 'Descrição oficial',
    defaultLocale: 'pt-BR'
  }
})
```

**⚠️ Gotcha**: SEMPRE usar `siteConfig.url` em vez de hardcode. Facilita migração entre ambientes (dev/staging/prod).

---

### 3. SSR vs CSR - Configuração de Renderização

**Documentação oficial**: https://nuxt.com/docs/guide/concepts/rendering

**Modos disponíveis**:
- `ssr: true` (padrão) - Server-Side Rendering
- `ssr: false` - Client-Side Rendering (SPA)

**Para este projeto**: `ssr: true` é OBRIGATÓRIO.

**Configuração**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // Garante que HTML seja gerado no servidor
})
```

**Como verificar se SSR está funcionando**:
1. Rodar `npm run dev`
2. Abrir página no navegador
3. Clicar com botão direito → "Exibir código-fonte da página"
4. ✅ **Deve mostrar HTML completo** (com conteúdo, meta tags, etc.)
5. ❌ **Se mostrar `<div id="__nuxt"></div>` vazio** → SSR está quebrado

**⚠️ Gotcha**: Algumas bibliotecas não funcionam com SSR (ex: `window`, `document`). Usar `<ClientOnly>` para esses casos.

---

### 4. `<ClientOnly>` - Componentes Client-Side

**Quando usar**: Para componentes que dependem de APIs do browser (window, localStorage, etc.).

**Documentação oficial**: https://nuxt.com/docs/api/components/client-only

**Exemplo**:
```vue
<template>
  <div>
    <!-- Renderizado no servidor -->
    <h1>Título SEO-friendly</h1>

    <!-- Renderizado APENAS no cliente -->
    <ClientOnly>
      <ChatWidget /> <!-- Usa window.localStorage -->
    </ClientOnly>
  </div>
</template>
```

**⚠️ Gotcha**: NÃO usar `<ClientOnly>` para conteúdo SEO-crítico (meta tags, schema, texto principal).

---

## 🎨 Nuxt SEO - Módulos e Composables

### 1. Instalação e Configuração

**Documentação oficial**: https://nuxtseo.com/getting-started/installation

**Instalação**:
```bash
npx nuxi@latest module add @nuxtjs/seo
```

**O que instala automaticamente**:
- `@nuxtjs/robots` - Robots.txt
- `@nuxtjs/sitemap` - Sitemap XML
- `nuxt-schema-org` - Schema.org / JSON-LD
- `nuxt-og-image` - Open Graph Images
- `nuxt-link-checker` - Validação de links

**Configuração mínima**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://example.com', // OBRIGATÓRIO
    name: 'Nome do Site',
    description: 'Descrição do site'
  }
})
```

---

### 2. `useSchemaOrg()` - Schema.org / JSON-LD

**Documentação oficial**: https://nuxtseo.com/schema-org/getting-started/how-it-works

**Composables disponíveis**:

| Composable | Quando Usar | Impacto SEO |
|------------|-------------|-------------|
| `defineOrganization()` | Identidade de marca (app.vue) | Knowledge Panel no Google |
| `defineWebPage()` | Toda página | Contexto básico |
| `defineFAQPage()` | Páginas com FAQ | Featured Snippet de FAQ |
| `defineArticle()` | Blog posts | Rich snippet de artigo |
| `defineProduct()` | E-commerce | Rich snippet de produto |
| `defineHowTo()` | Tutoriais passo-a-passo | Snippet de HowTo |
| `defineBreadcrumb()` | Navegação | Breadcrumbs nos resultados |

**Exemplo - Organization (Global)**:
```vue
<!-- app.vue -->
<script setup lang="ts">
useSchemaOrg([
  defineOrganization({
    name: 'Nome da Empresa',
    url: 'https://exemplo.com',
    logo: 'https://exemplo.com/logo.png',
    sameAs: [
      'https://twitter.com/empresa',
      'https://linkedin.com/company/empresa'
    ]
  })
])
</script>
```

**Exemplo - FAQ**:
```vue
<!-- components/FAQ.vue -->
<script setup lang="ts">
const faqs = [
  { question: 'Pergunta 1?', answer: 'Resposta 1' },
  { question: 'Pergunta 2?', answer: 'Resposta 2' }
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
```

**Exemplo - Article (Blog)**:
```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
useSchemaOrg([
  defineArticle({
    headline: 'Título do Artigo',
    description: 'Resumo do artigo',
    image: 'https://exemplo.com/article-image.jpg',
    datePublished: '2026-02-05',
    dateModified: '2026-02-05',
    author: {
      name: 'Nome do Autor',
      url: 'https://exemplo.com/autor'
    }
  })
])
</script>
```

**⚠️ Gotcha**:
- NÃO duplicar schemas (ex: definir Organization em múltiplos componentes)
- Organization deve estar apenas no `app.vue` ou layout principal
- Schemas específicos (Article, Product) vão nas páginas correspondentes

### Tabela de Decisão: Schema.org + Classes Tailwind

| Cenário | Schema Type | Composable | Classes Tailwind Recomendadas |
|---------|-------------|------------|-------------------------------|
| FAQ/Suporte | `FAQPage` | `defineFAQPage()` | `space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md` |
| Artigo/Blog | `Article` | `defineArticle()` | `prose prose-lg max-w-4xl mx-auto py-12` |
| Guia passo-a-passo | `HowTo` | `defineHowTo()` | `space-y-6 max-w-3xl` + `flex gap-4 p-6 bg-gray-50 rounded-lg` |
| Navegação | `BreadcrumbList` | `defineBreadcrumb()` | `flex items-center space-x-2 text-sm py-4` |
| Produto | `Product` | `defineProduct()` | `grid md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Organização | `Organization` | `defineOrganization()` | Apenas no `app.vue` (sem template visual) |
| Página Web | `WebPage` | `defineWebPage()` | `container mx-auto px-4` |

---

### 3. Robots.txt - Controle de Crawlers

**Documentação oficial**: https://nuxtseo.com/robots/getting-started/installation

**Configuração básica**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  robots: {
    allow: ['/'], // Permitir tudo por padrão
    disallow: ['/admin', '/api'], // Bloquear áreas específicas

    // User-agents específicos
    groups: [
      {
        userAgent: ['GPTBot', 'PerplexityBot'],
        allow: ['/'],
        disallow: ['/private']
      },
      {
        userAgent: ['AhrefsBot'],
        disallow: ['/'] // Bloquear scrapers
      }
    ]
  }
})
```

**User-Agents importantes (2026)**:
- `Googlebot` - Google Search
- `Bingbot` - Bing Search
- `GPTBot` - OpenAI (treina ChatGPT)
- `PerplexityBot` - Perplexity.ai
- `ClaudeBot` - Anthropic (treina Claude)
- `Google-Extended` - Treina Gemini/Bard
- `Applebot-Extended` - Apple Intelligence

**Verificação**:
```bash
# Deve retornar o robots.txt gerado
curl http://localhost:3000/robots.txt
```

**⚠️ Gotcha**: Bloquear GPTBot impede que ChatGPT cite seu site. Só bloqueie se quiser proteger conteúdo.

---

### 4. Sitemap - Geração de Sitemap.xml

**Documentação oficial**: https://nuxtseo.com/sitemap/getting-started/installation

**Configuração básica**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  sitemap: {
    strictNuxtContentPaths: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  }
})
```

**URLs dinâmicas (ex: blog posts)**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  sitemap: {
    urls: async () => {
      // Buscar posts de API/CMS
      const posts = await $fetch('/api/posts')

      return posts.map(post => ({
        loc: `/blog/${post.slug}`,
        lastmod: post.updatedAt,
        priority: 0.8,
        changefreq: 'weekly'
      }))
    }
  }
})
```

**Verificação**:
```bash
# Deve retornar XML do sitemap
curl http://localhost:3000/sitemap.xml
```

**⚠️ Gotcha**: Sitemap é gerado no build. Para conteúdo dinâmico, usar hook `urls` ou regenerar build periodicamente.

---

### 5. OG Image - Geração Dinâmica de Imagens

**Documentação oficial**: https://nuxtseo.com/og-image/getting-started/installation

**Uso básico**:
```vue
<!-- pages/index.vue -->
<script setup lang="ts">
defineOgImageComponent('NuxtSeo', {
  title: 'Título da Página',
  description: 'Subtítulo ou descrição',
  theme: '#00DC82', // Cor primária
  colorMode: 'dark'
})
</script>
```

**Templates disponíveis**:
- `NuxtSeo` - Template padrão do Nuxt
- `Custom` - Template personalizado (criar em `components/OgImage/`)

**Exemplo de template customizado**:
```vue
<!-- components/OgImage/Custom.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  author?: string
}>()
</script>

<template>
  <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    <div class="text-white text-6xl font-bold">{{ title }}</div>
    <div v-if="author" class="text-white text-2xl mt-4">por {{ author }}</div>
  </div>
</template>
```

**Uso do template customizado**:
```vue
<script setup lang="ts">
defineOgImageComponent('Custom', {
  title: 'Meu Artigo',
  author: 'João Silva'
})
</script>
```

**⚠️ Gotcha**:
- OG Images são geradas em build time
- Para imagens dinâmicas em runtime, usar edge functions (requer deploy em Vercel/Netlify)

---

## 🎨 Tailwind CSS - Referência Técnica

> **Versão obrigatória**: `@nuxtjs/tailwindcss ^6.11.4`
> **Documentação oficial**: https://tailwindcss.com/docs
> **Nuxt Module**: https://tailwindcss.nuxtjs.org

### Instalação

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

**Configuração no nuxt.config.ts**:
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  }
})
```

### Classes Críticas para SEO/Acessibilidade

| Categoria | Classes | Impacto SEO/AEO/GEO |
|-----------|---------|---------------------|
| **Container** | `container mx-auto px-4` | Layout consistente para crawlers |
| **Tipografia** | `prose prose-lg max-w-4xl` | Legibilidade para featured snippets |
| **Responsividade** | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Mobile-first (Core Web Vitals) |
| **Foco visível** | `focus:ring-2 focus:ring-primary-500` | Acessibilidade (a11y) |
| **Transições leves** | `transition-colors duration-200` | CLS < 0.1 |
| **Semântica visual** | `sr-only` (screen reader only) | Acessibilidade para crawlers |

### Padrões de Componentes

**Card com hover (SEO-friendly)**:
```vue
<template>
  <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <h3 class="text-xl font-bold mb-3 text-gray-900">Título</h3>
    <p class="text-gray-700 leading-relaxed">Descrição do card</p>
  </div>
</template>
```

**Botão CTA (conversão)**:
```vue
<template>
  <button class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
    Ação Principal
  </button>
</template>
```

**Lista semântica (AEO)**:
```vue
<template>
  <ul class="space-y-3 max-w-2xl">
    <li class="flex items-start gap-3">
      <span class="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
      <span class="text-gray-700">Item da lista com ícone semântico</span>
    </li>
  </ul>
</template>
```

### Dark Mode

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class', // Ativado por classe no <html>
  // ...
}
```

**Uso em templates**:
```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <h1 class="text-primary-600 dark:text-primary-400">Título adaptável</h1>
  </div>
</template>
```

### ⚠️ Anti-Patterns de Tailwind

| ❌ ERRADO | ✅ CORRETO | Justificativa |
|-----------|------------|---------------|
| `<style scoped>` com CSS customizado | Classes Tailwind inline | Bundle < 10KB |
| `class="titulo-custom"` | `class="text-3xl font-bold"` | Sem CSS adicional |
| Cores hardcoded (`#1a73e8`) | `text-primary-600` | Consistência + tema |
| Animações pesadas (>500ms) | `transition-* duration-200` | CLS < 0.1 |

### Links Rápidos

- **Tailwind Docs**: https://tailwindcss.com/docs
- **Tailwind Play**: https://play.tailwindcss.com/
- **Cheat Sheet**: https://tailwindcomponents.com/cheatsheet/
- **Nuxt Tailwind**: https://tailwindcss.nuxtjs.org/

---

## 🚨 Breaking Changes e Diferenças de Versão

### Nuxt 2 vs Nuxt 3

| Feature | Nuxt 2 | Nuxt 3 | Migração |
|---------|--------|--------|----------|
| Meta tags | `head()` | `useSeoMeta()` | Substituir função por composable |
| Async data | `asyncData()` | `useAsyncData()` | Usar composable no `<script setup>` |
| Fetch | `fetch()` | `useFetch()` | Usar composable |
| Configuração | `nuxt.config.js` | `nuxt.config.ts` | Renomear para `.ts` |
| Modo universal | `mode: 'universal'` | `ssr: true` | Trocar propriedade |

**⚠️ Gotcha**: Código Nuxt 2 NÃO funciona diretamente no Nuxt 3. Sempre usar APIs do Nuxt 3.

---

### @nuxtjs/seo 1.x vs 2.x

| Feature | 1.x | 2.x | Nota |
|---------|-----|-----|------|
| Instalação | Módulos separados | Pacote único | 2.x instala tudo |
| Schema.org | `@nuxtjs/schema-org` | `nuxt-schema-org` | Renomeado |
| Site config | Manual | `site: {}` no config | 2.x simplificado |
| OG Image | Opcional | Incluído | 2.x integrado |

**Recomendação**: Usar sempre 2.x (ou superior) para novos projetos.

---

## 📖 Diferenças: useHead vs useSeoMeta

| Aspecto | `useHead()` | `useSeoMeta()` |
|---------|-------------|----------------|
| **Propósito** | Tags genéricas de `<head>` | Especificamente meta tags SEO |
| **Type Safety** | Parcial | Completo (autocomplete) |
| **Sintaxe** | Verbosa | Simplificada |
| **Performance** | Similar | Otimizado para meta tags |
| **Quando usar** | Scripts, links, styles | Meta tags, OG, Twitter Cards |

**Exemplo comparativo**:
```vue
<!-- useHead (mais verboso) -->
<script setup lang="ts">
useHead({
  title: 'Título',
  meta: [
    { name: 'description', content: 'Descrição' },
    { property: 'og:title', content: 'Título OG' },
    { property: 'og:image', content: 'https://...' }
  ]
})
</script>

<!-- useSeoMeta (recomendado para SEO) -->
<script setup lang="ts">
useSeoMeta({
  title: 'Título',
  description: 'Descrição',
  ogTitle: 'Título OG',
  ogImage: 'https://...'
})
</script>
```

**Recomendação**: Usar `useSeoMeta()` para meta tags e `useHead()` para scripts/links.

---

## 🔗 Links Rápidos para Documentação Oficial

### Nuxt 3
- **Guia de Renderização SSR**: https://nuxt.com/docs/guide/concepts/rendering
- **API de Composables**: https://nuxt.com/docs/api/composables/use-seo-meta
- **Configuração do Nuxt**: https://nuxt.com/docs/api/nuxt-config
- **Deployment**: https://nuxt.com/docs/getting-started/deployment

### Nuxt SEO
- **Visão Geral**: https://nuxtseo.com/
- **Site Config**: https://nuxtseo.com/site-config/getting-started/installation
- **Schema.org**: https://nuxtseo.com/schema-org/getting-started/installation
- **Robots**: https://nuxtseo.com/robots/getting-started/installation
- **Sitemap**: https://nuxtseo.com/sitemap/getting-started/installation
- **OG Image**: https://nuxtseo.com/og-image/getting-started/installation

### Tailwind CSS
- **Documentação Oficial**: https://tailwindcss.com/docs
- **Nuxt Tailwind Module**: https://tailwindcss.nuxtjs.org/
- **Tailwind Play (Playground)**: https://play.tailwindcss.com/
- **Cheat Sheet**: https://tailwindcomponents.com/cheatsheet/

### Schema.org
- **Vocabulário Completo**: https://schema.org/
- **Validator**: https://validator.schema.org/
- **Google Rich Results**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

### Ferramentas
- **Lighthouse**: https://developer.chrome.com/docs/lighthouse/overview/
- **Core Web Vitals**: https://web.dev/vitals/
- **Google Search Console**: https://search.google.com/search-console

---

## ⚠️ Gotchas e Pitfalls Comuns

> **Formato AI-Friendly**: Cada gotcha segue o padrão: Problema → Causa → ❌ ERRADO → ✅ CORRETO

### 1. Schema Duplicado
**Problema**: Definir mesmo schema em múltiplos lugares

**❌ ERRADO**:
```vue
<!-- app.vue -->
<script setup lang="ts">
useSchemaOrg([defineOrganization({ name: 'Marca' })])
</script>

<!-- layout/default.vue -->
<script setup lang="ts">
useSchemaOrg([defineOrganization({ name: 'Marca' })]) // Duplicado!
</script>
```

**✅ CORRETO**: Definir schemas globais (Organization) apenas no `app.vue`.

---

### 2. Meta Tags Client-Side
**Problema**: Definir meta tags após renderização SSR

**❌ ERRADO**:
```vue
<script setup lang="ts">
onMounted(() => {
  useSeoMeta({ title: 'Título' }) // Tarde demais!
})
</script>
```

**✅ CORRETO**: Executar no escopo principal do `<script setup>`.
```vue
<script setup lang="ts">
useSeoMeta({ title: 'Título' }) // Executa durante SSR
</script>
```

---

### 3. URLs Hardcoded
**Problema**: Usar URLs fixas em vez de configuração centralizada

**❌ ERRADO**:
```vue
<script setup lang="ts">
useSeoMeta({
  ogUrl: 'https://meusite.com/pagina' // Hardcoded!
})
</script>
```

**✅ CORRETO**: Usar `useSiteConfig()` e `useRoute()`:
```vue
<script setup lang="ts">
const siteConfig = useSiteConfig()
const route = useRoute()

useSeoMeta({
  ogUrl: `${siteConfig.url}${route.path}`
})
</script>
```

---

### 4. Sitemap Não Atualiza
**Problema**: Sitemap não reflete conteúdo novo

**Causa**: Sitemap é gerado no build, não em runtime

**Solução**: Para conteúdo dinâmico, usar hook `urls`:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  sitemap: {
    urls: async () => {
      const posts = await $fetch('/api/posts')
      return posts.map(p => ({ loc: `/blog/${p.slug}` }))
    }
  }
})
```

---

### 5. OG Image Quebrada
**Problema**: Preview de OG Image mostra imagem quebrada

**Causas comuns**:
- Caminho relativo em vez de absoluto
- Imagem muito grande (>8MB)
- CORS bloqueando

**❌ ERRADO**:
```vue
<script setup lang="ts">
useSeoMeta({
  ogImage: '/og-image.png' // Caminho relativo!
})
</script>
```

**✅ CORRETO**:
```vue
<script setup lang="ts">
const siteConfig = useSiteConfig()

useSeoMeta({
  ogImage: `${siteConfig.url}/og-image.png` // Sempre absoluto
})
</script>
```

---

## 📝 Notas de Implementação para IA

### Prioridades ao Desenvolver

1. **SEMPRE começar com SSR habilitado** (`ssr: true`)
2. **SEMPRE definir `site.url`** no nuxt.config.ts (obrigatório para SEO)
3. **SEMPRE validar Schema.org** em https://validator.schema.org/
4. **SEMPRE testar View Source** (Ctrl+U) para verificar SSR
5. **NUNCA usar `onMounted` para meta tags ou schema**

### Ordem de Implementação Recomendada

```
1. nuxt.config.ts (site config + módulos)
   ↓
2. app.vue (Organization schema global)
   ↓
3. layouts/default.vue (estrutura base)
   ↓
4. pages/index.vue (home com WebPage schema)
   ↓
5. components/FAQ.vue (FAQPage schema)
   ↓
6. Validar com Nuxt DevTools + Schema Validator
```

### Checklist Antes de Considerar "Completo"

- [ ] `npm run dev` executa sem erros
- [ ] Nuxt DevTools → Aba SEO → 0 avisos
- [ ] View Source mostra HTML completo (não vazio)
- [ ] Schema Validator retorna 0 erros
- [ ] `/robots.txt` acessível e configurado
- [ ] `/sitemap.xml` acessível com todas as páginas
- [ ] Lighthouse SEO Score: 95+/100

---

## 🎓 Glossário de Termos

| Termo | Significado | Exemplo |
|-------|-------------|---------|
| **SSR** | Server-Side Rendering - HTML gerado no servidor | Nuxt renderiza página antes de enviar ao cliente |
| **CSR** | Client-Side Rendering - HTML gerado no navegador | Vue SPA tradicional |
| **JSON-LD** | JavaScript Object Notation for Linked Data | Formato de Schema.org |
| **OG Tags** | Open Graph Tags - Meta tags para redes sociais | `og:title`, `og:image` |
| **Canonical URL** | URL oficial de uma página (evita duplicação) | `<link rel="canonical" href="...">` |
| **Rich Snippet** | Resultado de busca enriquecido (com estrelas, imagem, etc.) | FAQ box, Product card |
| **Featured Snippet** | "Position Zero" - resposta destacada no topo do Google | Caixa com resposta direta |
| **Sitemap** | Arquivo XML listando todas as URLs do site | `/sitemap.xml` |
| **Robots.txt** | Arquivo que controla quais bots podem acessar o site | `/robots.txt` |
| **Core Web Vitals** | Métricas de performance (LCP, FID, CLS) | Sinais de ranqueamento do Google |

---

**Última atualização**: Fevereiro 2026
**Mantenedor**: [Seu Nome/Equipe]
**Feedback**: Reportar erros ou sugestões em [link do repositório]
