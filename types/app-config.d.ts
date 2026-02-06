
import '@nuxt/schema'

declare module 'nuxt/schema' {
    interface AppConfigInput {
        brand?: {
            name?: string
            tagline?: string
            logo?: string
            socialLinks?: {
                twitter?: string
                instagram?: string
                facebook?: string
            }
        }
        company?: {
            name?: string
            foundingDate?: string
            email?: string
            phone?: string
            phoneDisplay?: string
            address?: {
                street?: string
                neighborhood?: string
                city?: string
                state?: string
                country?: string
                postalCode?: string
            }
        }
    }

    interface BrandConfig {
        name: string
        tagline: string
        logo: string
        socialLinks: {
            twitter: string
            instagram: string
            facebook: string
        }
    }

    interface CompanyConfig {
        name: string
        foundingDate: string
        email: string
        phone: string
        phoneDisplay: string
        address: {
            street: string
            neighborhood: string
            city: string
            state: string
            country: string
            postalCode: string
        }
    }

    interface AppConfig {
        brand: BrandConfig
        company: CompanyConfig
    }
}

export { }
