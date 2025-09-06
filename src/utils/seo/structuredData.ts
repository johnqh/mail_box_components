interface Organization {
  "@type": "Organization";
  name: string;
  url?: string;
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email?: string;
  };
}

interface BaseStructuredData {
  "@context": "https://schema.org";
  name: string;
  description: string;
  url: string;
}

interface SoftwareApplicationData extends BaseStructuredData {
  "@type": "SoftwareApplication";
  applicationCategory?: string;
  operatingSystem?: string;
  programmingLanguage?: string[];
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
  features?: string[];
  author?: Organization;
}

interface WebPageData extends BaseStructuredData {
  "@type": "WebPage";
  mainEntity?: {
    "@type": "Product" | "SoftwareApplication";
    name: string;
    description: string;
    category?: string;
    applicationCategory?: string;
    operatingSystem?: string;
    programmingLanguage?: string[];
    offers?: {
      "@type": "Offer";
      price: string;
      priceCurrency: string;
    };
  };
}

interface AboutPageData extends BaseStructuredData {
  "@type": "AboutPage";
  mainEntity?: Organization & {
    "@id": string;
    foundingDate?: string;
  };
}

interface TechArticleData extends BaseStructuredData {
  "@type": "TechArticle";
  headline: string;
  author?: Organization;
  datePublished?: string;
  dateModified?: string;
  publisher?: Organization;
}

export type StructuredData = SoftwareApplicationData | WebPageData | AboutPageData | TechArticleData;

// Common organization data
export const BASE_ORGANIZATION: Organization = {
  "@type": "Organization",
  name: "0xmail.box",
  url: "https://0xmail.box",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@sudobility.com"
  }
};

// Factory functions for common structured data patterns
export const createSoftwareApplicationData = (
  overrides: Partial<SoftwareApplicationData>
): SoftwareApplicationData => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "0xmail.box",
  description: "Web3 email platform connecting wallets to email addresses with ENS/SNS domain support and smart contract integration",
  url: "https://0xmail.box",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  },
  author: BASE_ORGANIZATION,
  ...overrides
});

export const createWebPageData = (
  overrides: Partial<WebPageData>
): WebPageData => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "0xmail.box",
  description: "Web3 email platform connecting wallets to email addresses",
  url: "https://0xmail.box",
  ...overrides
});

export const createAboutPageData = (
  overrides: Partial<AboutPageData>
): AboutPageData => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About 0xmail.box",
  description: "Learn about the team behind 0xmail.box, the revolutionary Web3 email platform that connects wallets to email addresses without passwords.",
  url: "https://0xmail.box/about",
  mainEntity: {
    ...BASE_ORGANIZATION,
    "@id": "https://0xmail.box/#organization",
    foundingDate: "2024"
  },
  ...overrides
});

export const createTechArticleData = (
  overrides: Partial<TechArticleData>
): TechArticleData => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Documentation",
  headline: "0xmail.box Documentation - Web3 Email Platform Guide",
  description: "Complete documentation for 0xmail.box Web3 email platform. Learn how to connect wallets, manage ENS/SNS domain emails, integrate smart contracts, and use Web3 communication features.",
  url: "https://0xmail.box/document",
  datePublished: "2025-01-12",
  dateModified: "2025-01-12",
  author: BASE_ORGANIZATION,
  publisher: BASE_ORGANIZATION,
  ...overrides
});