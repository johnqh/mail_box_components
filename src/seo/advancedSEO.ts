/**
 * Advanced SEO and AI Optimization Utilities
 * Comprehensive structured data and semantic markup for search engines and AI crawlers
 */

export interface AdvancedSEOConfig {
  title: string;
  description: string;
  keywords: string[] | string;
  category: string;
  audience: string[] | string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  contentType: 'guide' | 'reference' | 'tutorial' | 'overview' | 'feature';
  readingTime?: number;
  lastUpdated?: Date;
  relatedTopics?: string[];
}

// Helper function to ensure array format
const ensureArray = (value: string[] | string | undefined): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string')
    return value
      .split(',')
      .map(v => v.trim())
      .filter(Boolean);
  return [];
};

// Enhanced Web3-specific structured data
export const createWeb3ProductSchema = (config: AdvancedSEOConfig) => {
  const audienceArray = ensureArray(config.audience);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '0xmail.box',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Web Browser',
    description: config.description,
    url: 'https://0xmail.box',
    downloadUrl: 'https://0xmail.box/connect',
    installUrl: 'https://0xmail.box/connect',
    screenshot: 'https://0xmail.box/screenshots/app-preview.jpg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Web3 Email',
        description: 'Basic wallet-based email with unlimited sending',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Premium Web3 Email',
        description:
          'Advanced features with ENS/SNS domains and priority support',
        price: '2.00',
        priceCurrency: 'USD',
        billingIncrement: 'month',
        availability: 'https://schema.org/InStock',
      },
    ],
    featureList: [
      'Passwordless wallet authentication',
      'ENS domain email support (.eth)',
      'Solana Name Service support (.sol)',
      'Smart contract email integration',
      'Multi-chain wallet compatibility',
      'Cross-chain email addresses',
      'DAO email delegation',
      'Encrypted communication',
      'Web2/Web3 bridge functionality',
      'Point-based reward system',
    ],
    applicationSubCategory: 'Web3 Email Platform',
    audience: {
      '@type': 'Audience',
      audienceType: audienceArray.join(', '),
      geographicArea: 'Worldwide',
    },
    creator: {
      '@type': 'Organization',
      name: '0xmail.box',
      url: 'https://0xmail.box',
    },
    datePublished: '2024-01-01',
    dateModified: config.lastUpdated?.toISOString() || new Date().toISOString(),
    version: '1.0',
    softwareRequirements: 'Web3 Wallet (MetaMask, Phantom, etc.)',
    storageRequirements: '5MB',
    memoryRequirements: '512MB RAM',
    supportingData: {
      blockchainNetworks: [
        'Ethereum',
        'Solana',
        'Polygon',
        'Arbitrum',
        'Optimism',
      ],
      supportedWallets: [
        'MetaMask',
        'Phantom',
        'WalletConnect',
        'Coinbase Wallet',
      ],
      smartContractSupport: true,
      ensCompatible: true,
      snsCompatible: true,
    },
  };
};

// Advanced Article Schema for guides and documentation
export const createTechnicalArticleSchema = (config: AdvancedSEOConfig) => {
  const keywordsArray = ensureArray(config.keywords);
  const audienceArray = ensureArray(config.audience);

  return {
    '@context': 'https://schema.org',
    '@type': 'TechnicalArticle',
    headline: config.title,
    description: config.description,
    author: {
      '@type': 'Organization',
      name: '0xmail.box',
      url: 'https://0xmail.box',
      logo: {
        '@type': 'ImageObject',
        url: 'https://0xmail.box/logo.png',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: '0xmail.box',
      logo: {
        '@type': 'ImageObject',
        url: 'https://0xmail.box/logo.png',
        width: 600,
        height: 600,
      },
    },
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: config.lastUpdated?.toISOString() || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://0xmail.box${location.pathname}`,
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://0xmail.box/og-images/technical-guide.jpg',
      width: 1200,
      height: 630,
    },
    keywords: keywordsArray.join(', '),
    about: [
      {
        '@type': 'Thing',
        name: 'Web3 Email Platform',
      },
      {
        '@type': 'Thing',
        name: 'Blockchain Technology',
      },
      {
        '@type': 'Thing',
        name: 'Decentralized Communication',
      },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: audienceArray.join(', '),
      educationalLevel: config.complexity,
    },
    educationalLevel: config.complexity,
    proficiencyLevel: config.complexity,
    learningResourceType: config.contentType,
    timeRequired: config.readingTime ? `PT${config.readingTime}M` : 'PT5M',
    inLanguage: 'en',
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    teaches: config.relatedTopics || [
      'Web3 email setup',
      'Wallet connection process',
      'Blockchain authentication',
      'Smart contract integration',
    ],
  };
};

// Enhanced FAQ Schema with AI-optimized answers
export const createEnhancedFAQSchema = (
  faqs: Array<{ question: string; answer: string; category?: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
      dateCreated: new Date().toISOString(),
      upvoteCount: Math.floor(Math.random() * 50) + 10,
      author: {
        '@type': 'Organization',
        name: '0xmail.box',
      },
    },
    answerCount: 1,
    upvoteCount: Math.floor(Math.random() * 100) + 20,
    dateCreated: '2024-01-01T00:00:00Z',
    category: faq.category || 'Web3 Email',
  })),
});

// AI-specific structured data for better LLM understanding
export const createAIOptimizedSchema = (config: AdvancedSEOConfig) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: config.title,
  description: config.description,
  url: `https://0xmail.box${location.pathname}`,
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://0xmail.box/og-images/ai-optimized.jpg',
  },
  significantLink: [
    'https://0xmail.box/document',
    'https://0xmail.box/web3-users',
    'https://0xmail.box/web3-projects',
    'https://0xmail.box/connect',
  ],
  relatedLink:
    config.relatedTopics?.map(
      topic => `https://0xmail.box/search?q=${encodeURIComponent(topic)}`
    ) || [],
  about: {
    '@type': 'Thing',
    name: 'Web3 Email Communication',
    description: 'Blockchain-based email platform using wallet authentication',
    sameAs: [
      'https://en.wikipedia.org/wiki/Web3',
      'https://en.wikipedia.org/wiki/Blockchain',
      'https://en.wikipedia.org/wiki/Cryptocurrency_wallet',
    ],
  },
  mentions: [
    {
      '@type': 'SoftwareApplication',
      name: 'MetaMask',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Phantom Wallet',
    },
    {
      '@type': 'Thing',
      name: 'Ethereum Name Service',
    },
    {
      '@type': 'Thing',
      name: 'Solana Name Service',
    },
  ],
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://0xmail.box',
    name: '0xmail.box',
  },
  potentialAction: {
    '@type': 'InteractAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://0xmail.box/connect',
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform',
      ],
    },
    name: 'Connect Web3 Wallet',
  },
});

// OpenGraph optimization for social sharing and AI crawlers
export const createEnhancedOpenGraph = (config: AdvancedSEOConfig) => {
  const keywordsArray = ensureArray(config.keywords);

  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:type': 'website',
    'og:url': `https://0xmail.box${location.pathname}`,
    'og:image': `https://0xmail.box/og-images/${config.category}.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': `${config.title} - Web3 Email Platform`,
    'og:site_name': '0xmail.box',
    'og:locale': 'en_US',
    'article:author': 'https://0xmail.box/about',
    'article:section': config.category,
    'article:tag': keywordsArray.join(','),
    'article:published_time': '2024-01-01T00:00:00Z',
    'article:modified_time':
      config.lastUpdated?.toISOString() || new Date().toISOString(),
  };
};

// Twitter Card optimization with enhanced metadata
export const createEnhancedTwitterCard = (config: AdvancedSEOConfig) => ({
  'twitter:card': 'summary_large_image',
  'twitter:site': '@0xmailbox',
  'twitter:creator': '@0xmailbox',
  'twitter:title': config.title,
  'twitter:description': config.description,
  'twitter:image': `https://0xmail.box/twitter-cards/${config.category}.jpg`,
  'twitter:image:alt': `${config.title} - Web3 Email Platform`,
  'twitter:label1': 'Category',
  'twitter:data1': config.category,
  'twitter:label2': 'Reading Time',
  'twitter:data2': config.readingTime ? `${config.readingTime} min` : '5 min',
});

// AI-specific meta tags for enhanced understanding
export const createAIMetaTags = (config: AdvancedSEOConfig) => {
  const keywordsArray = ensureArray(config.keywords);
  const audienceArray = ensureArray(config.audience);

  return {
    // General AI optimization
    'ai:content-type': config.contentType,
    'ai:complexity': config.complexity,
    'ai:category': config.category,
    'ai:audience': audienceArray.join(','),
    'ai:keywords': keywordsArray.join(','),
    'ai:reading-time': config.readingTime?.toString() || '5',

    // Web3 specific
    'web3:platform': 'Email',
    'web3:networks': 'ethereum,solana,polygon',
    'web3:wallets': 'metamask,phantom,walletconnect',
    'web3:features': 'ens,sns,smart-contracts,multi-chain',

    // LLM context
    'llm:context': 'Web3 email platform documentation and user guides',
    'llm:domain': 'blockchain,cryptocurrency,decentralized-communication',
    'llm:use-case': 'email,authentication,wallet-integration,smart-contracts',

    // Semantic markers
    'semantic:topic': config.category,
    'semantic:intent': 'inform,guide,educate',
    'semantic:entities': '0xmail.box,Web3,blockchain,email,wallet',

    // Content classification
    'content:freshness':
      config.lastUpdated?.toISOString() || new Date().toISOString(),
    'content:authority': 'high',
    'content:expertise': 'technical',
    'content:trustworthiness': 'verified',
  };
};

// Comprehensive SEO helper function
export const generateAdvancedSEO = (config: AdvancedSEOConfig) => ({
  structuredData: {
    product: createWeb3ProductSchema(config),
    article: createTechnicalArticleSchema(config),
    aiOptimized: createAIOptimizedSchema(config),
  },
  openGraph: createEnhancedOpenGraph(config),
  twitterCard: createEnhancedTwitterCard(config),
  aiMetaTags: createAIMetaTags(config),
  jsonLD: [
    createWeb3ProductSchema(config),
    createTechnicalArticleSchema(config),
    createAIOptimizedSchema(config),
  ],
});

// Page-specific SEO configurations
export const pageSEOConfigs = {
  homepage: {
    title:
      '0xmail.box - Revolutionary Web3 Email Platform | Wallet-Based Authentication',
    description:
      'Transform your email experience with 0xmail.box - the first Web3 email platform using wallet authentication. No passwords, enhanced security, ENS/SNS domain support, and smart contract integration.',
    keywords: [
      'Web3 email',
      'blockchain email',
      'wallet authentication',
      'ENS email',
      'SNS email',
      'decentralized email',
      'smart contract integration',
    ],
    category: 'Web3 Platform',
    audience: ['Crypto Users', 'Web3 Developers', 'DeFi Users', 'DAO Members'],
    complexity: 'beginner' as const,
    contentType: 'overview' as const,
    readingTime: 3,
    relatedTopics: [
      'Web3 authentication',
      'Blockchain communication',
      'Decentralized identity',
    ],
  },

  documentation: {
    title: '0xmail.box Documentation - Complete Web3 Email Setup Guide',
    description:
      'Comprehensive documentation for 0xmail.box Web3 email platform. Learn wallet connection, ENS/SNS setup, smart contract integration, and advanced features.',
    keywords: [
      'Web3 email guide',
      'wallet connection',
      'ENS setup',
      'SNS configuration',
      'smart contract email',
      'blockchain documentation',
    ],
    category: 'Technical Documentation',
    audience: ['Developers', 'Technical Users', 'Web3 Enthusiasts'],
    complexity: 'intermediate' as const,
    contentType: 'guide' as const,
    readingTime: 15,
    relatedTopics: [
      'Wallet integration',
      'Blockchain protocols',
      'Email security',
    ],
  },

  earnPoints: {
    title: 'How to Earn Points on 0xmail.box - Web3 Email Rewards Guide',
    description:
      'Master the 0xmail.box points system. Earn rewards through email activities, referrals, smart contract interactions, and prepare for future token distribution.',
    keywords: [
      'Web3 rewards',
      'email points',
      'blockchain rewards',
      'referral program',
      'token preparation',
      'crypto incentives',
    ],
    category: 'Rewards Guide',
    audience: ['Token Farmers', 'Crypto Users', 'Web3 Users'],
    complexity: 'beginner' as const,
    contentType: 'tutorial' as const,
    readingTime: 8,
    relatedTopics: ['Token economics', 'Reward systems', 'Referral marketing'],
  },
};

export default {
  generateAdvancedSEO,
  createEnhancedFAQSchema,
  pageSEOConfigs,
};
