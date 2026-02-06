# Arquitetura de SEO, AEO e GEO - Guia de Apresentação

Este guia foca nos **pontos essenciais** do código para demonstrar a maturidade técnica do projeto Climm.

---

## 1. Foundation (Higiene Técnica)

**Arquivo:** `nuxt.config.ts`
**Objetivo:** "Centralizamos toda a identidade do site aqui. Se mudarmos o nome ou descrição aqui, atualiza o Google, o Facebook (OG) e o Schema.org automaticamente."

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],

  // [ESSENCIAL] O Google precisa ver o HTML pronto. Sem SSR = Sem Indexação.
  ssr: true,

  // [FONTE DA VERDADE] Dados centralizados que alimentam Robots, Sitemap e Metatags.
  site: {
    url: 'https://climm.vercel.app',
    name: 'Climm - Soluções Inteligentes',
    description: 'Inovação e Qualidade em Forros de PVC...',
    defaultLocale: 'pt-BR',
    identity: {
      type: 'Organization' // Define que somos uma empresa, não um blog pessoal
    }
  },

  // [SEGURANÇA] Evita que páginas de teste ou quebradas apareçam no Google.
  sitemap: {
    strictNuxtContentPaths: true
  }
})
```

---

## 2. Dicionário para IAs (G.E.O.)

**Arquivo:** `app/app.vue`
**Objetivo:** "Não usamos apenas 'tags HTML'. Nós entregamos um JSON estruturado que ensina ao Google quem somos, onde ficamos e o que vendemos."

```typescript
// [COMANDO] Injetamos identidade estruturada (JSON-LD) em todas as páginas
useSchemaOrg([
  defineLocalBusiness({
    '@id': '#localbusiness', // Cria um "nó" no grafo de conhecimento
    name: siteConfig.name,
    // [CONEXÃO] Liga a marca ao logotipo oficial
    logo: `${siteConfig.url}${appConfig.brand?.logo}`,
    // [LOCALIZAÇÃO] Essencial para aparecer em buscas "perto de mim"
    address: {
      streetAddress: appConfig.company?.address?.street,
      addressLocality: 'Juiz de Fora',
      addressRegion: 'MG',
      addressCountry: 'BR'
    },
    // [CONTATO] Facilita ações de "Ligar agora" direto da busca
    contactPoint: {
      contactType: 'Customer Support',
      telephone: appConfig.company?.phone
    }
  }),
  // [SERVIÇO] Explicamos explicitamente o que fazemos
  {
    '@type': 'Service',
    name: 'Instalação de Forros de PVC',
    provider: { '@id': '#localbusiness' } // Conecta o serviço à empresa acima
  }
])
```

---

## 3. Motores de Resposta (A.E.O.)

**Arquivo:** `components/SectionFAQ.vue`
**Objetivo:** "Transformamos o componente visual de FAQ em dados legíveis por máquina. Isso aumenta a chance de o Google usar nossa resposta no topo da página (Position Zero)."

```typescript
// [AUTOMAÇÃO] O FAQ visual vira dados estruturados automaticamente
useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: props.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer // O texto que a Alexa/Google Assistant leriam
      }
    }))
  }
])
```

---

## 4. Autoridade Visual (Social)

**Arquivo:** `app/app.vue` (ou `nuxt.config.ts` se configurado globalmente)
**Objetivo:** "Ninguém compartilha links feios. Nosso sistema gera banners automáticos para cada página, aumentando o CTR (taxa de clique)."

```typescript
// [DINÂMICO] Cria uma imagem de compartilhamento personalizada em tempo real
defineOgImageComponent('NuxtSeo', {
  title: siteConfig.name, // Pega o título da página atual
  description: siteConfig.description,
  theme: '#1e293b', // Usa as cores da marca (Dark Mode)
  colorMode: 'dark'
})
```

---

## 5. Rastreabilidade (Robots & Sitemap)

**Arquivo:** Terminal ou Arquivo Gerado (`robots.txt`)
**Objetivo:** "Protegemos o site. Em desenvolvimento, bloqueamos tudo. Em produção, liberamos apenas o necessário, inclusive ajudando o ChatGPT a ler nosso conteúdo corretamente."

**Robots Module (NuxtSEO):**
Diferente de projetos tradicionais, **não temos um arquivo `public/robots.txt` físico**. Usamos o módulo `nuxt-simple-robots` (parte do `@nuxtjs/seo`) que gera o arquivo dinamicamente com base no ambiente.

*   **Zero Config:** O módulo detecta automaticamente se estamos em produção ou não.
    *   **Dev/Staging:** `X-Robots-Tag: noindex, nofollow` (Bloqueio total automático).
    *   **Produção:** Gera regras padrão permitindo indexação.
*   **Single Source of Truth:** O arquivo obedece às configurações globais do `site` config (URL, indexable, etc), mantendo consistência com o Sitemap e Schema.
*   **Integração:** Se uma rota for removida do Sitemap ou marcada como secreta, o `robots.txt` reflete isso automaticamente.

*Exemplo de saída automática:*
```text
User-agent: GPTBot      # [ESTRATÉGIA] Permitimos que IAs aprendam sobre a Climm
Disallow: /admin        # [PROTEÇÃO] Bloqueamos áreas administrativas
Sitemap: https://climm.vercel.app/sitemap.xml
```
