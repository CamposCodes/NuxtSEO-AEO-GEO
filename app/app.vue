<script setup lang="ts">
const appConfig = useAppConfig()
const siteConfig = useSiteConfig()

// Organization Schema (Global Identity for GEO)
useSchemaOrg([
  defineOrganization({
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${appConfig.brand?.logo}`,
    description: siteConfig.description,
    foundingDate: appConfig.company?.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: appConfig.company?.email,
      telephone: appConfig.company?.phone,
      areaServed: 'BR',
      availableLanguage: ['pt-BR']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: appConfig.company?.address?.street,
      addressLocality: appConfig.company?.address?.city,
      addressRegion: appConfig.company?.address?.state,
      postalCode: appConfig.company?.address?.postalCode,
      addressCountry: appConfig.company?.address?.country
    },
    sameAs: [
      appConfig.brand?.socialLinks?.twitter,
      appConfig.brand?.socialLinks?.instagram,
      appConfig.brand?.socialLinks?.facebook
    ]
  })
])

// Configure the automatic OG Image generator (from the user screenshot)
defineOgImageComponent('NuxtSeo', {
  title: siteConfig.name, // Will show "Climm - Soluções Inteligentes"
  description: siteConfig.description,
  theme: '#1e293b', // primary-900 (slate-900 approx)
  colorMode: 'dark'
})

// Global SEO Meta
useSeoMeta({
  titleTemplate: `%s - ${siteConfig.name}`,
  ogSiteName: siteConfig.name,
  // ogImage: '/assets/pvc.png', // Commented out to allow dynamic generation
  twitterCard: 'summary_large_image',
  twitterTitle: siteConfig.name,
  twitterDescription: siteConfig.description,
  // twitterImage: '/assets/pvc.png'
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/logo.png' },
    { rel: 'apple-touch-icon', href: '/assets/logo.png' }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

