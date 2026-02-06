<script setup lang="ts">
const appConfig = useAppConfig()
const siteConfig = useSiteConfig()

// Organization Schema (Global Identity for GEO)
useSchemaOrg([
  defineOrganization({
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${appConfig.brand.logo}`,
    description: siteConfig.description,
    foundingDate: appConfig.company.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: appConfig.company.email,
      telephone: appConfig.company.phone,
      areaServed: 'BR',
      availableLanguage: ['pt-BR']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: appConfig.company.address.street,
      addressLocality: appConfig.company.address.city,
      addressRegion: appConfig.company.address.state,
      addressCountry: appConfig.company.address.country
    },
    sameAs: [
      appConfig.brand.social.twitter,
      appConfig.brand.social.instagram,
      appConfig.brand.social.facebook
    ]
  })
])

// Global SEO Meta
useSeoMeta({
  titleTemplate: `%s - ${siteConfig.name}`,
  ogSiteName: siteConfig.name,
  twitterCard: 'summary_large_image'
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

