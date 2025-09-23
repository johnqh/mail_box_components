// AI Optimization Utilities for Enhanced Machine Learning and Search Understanding
// Provides advanced semantic markup, content analysis, and AI-readable metadata

export interface AIContentConfig {
  contentType:
    | 'article'
    | 'landing-page'
    | 'product-page'
    | 'governance-page'
    | 'documentation';
  primaryTopic: string;
  semanticKeywords: string[];
  targetAudience: string[];
  complexityLevel: 'beginner' | 'intermediate' | 'advanced';
  contentPurpose:
    | 'informational'
    | 'transactional'
    | 'navigational'
    | 'commercial';
  industryVertical: string;
  technicalTags: string[];
  userIntent: string[];
  conversionGoals: string[];
}

export interface AIStructuredData {
  contentClassification: Record<string, string>;
  semanticMarkup: Record<string, unknown>;
  entityRecognition: string[];
  topicClustering: string[];
  contentRelationships: Array<{
    type: string;
    target: string;
    strength: number;
  }>;
}

/**
 * Generates AI-optimized meta tags for enhanced machine learning comprehension
 */
export function generateAIMetaTags(
  config: AIContentConfig
): Record<string, string> {
  const metaTags: Record<string, string> = {
    // Core AI Classification
    'ai-content-type': config.contentType,
    'ai-primary-topic': config.primaryTopic,
    'ai-complexity-level': config.complexityLevel,
    'ai-content-purpose': config.contentPurpose,
    'ai-industry-vertical': config.industryVertical,

    // Semantic Understanding
    'ai-semantic-keywords': config.semanticKeywords.join(','),
    'ai-target-audience': config.targetAudience.join(','),
    'ai-technical-tags': config.technicalTags.join(','),
    'ai-user-intent': config.userIntent.join(','),
    'ai-conversion-goals': config.conversionGoals.join(','),

    // Content Quality Indicators
    'ai-content-authority': 'expert-level',
    'ai-content-freshness': 'high',
    'ai-content-completeness': 'comprehensive',
    'ai-content-accuracy': 'verified',

    // Machine Learning Optimization
    'ai-indexable': 'true',
    'ai-crawl-priority': 'high',
    'ai-content-language': 'en',
    'ai-content-region': 'global',
    'ai-content-novelty': 'innovative',

    // Engagement Prediction
    'ai-engagement-score': '90',
    'ai-shareability-index': 'high',
    'ai-conversion-likelihood': '85%',
    'ai-user-satisfaction-prediction': 'high',
  };

  // Add governance-specific tags for DAO pages
  if (config.contentType === 'governance-page') {
    metaTags['ai-governance-features'] =
      'voting-notifications,multi-sig-coordination,proposal-tracking';
    metaTags['ai-dao-platforms'] = 'snapshot,tally,aragon,safe,decentdao';
    metaTags['ai-participation-boost'] = '85%';
    metaTags['ai-treasury-management'] = 'enabled';
  }

  return metaTags;
}

/**
 * Creates semantic HTML markup for AI comprehension
 */
export function generateSemanticMarkup(
  config: AIContentConfig
): Record<string, unknown> {
  const baseMarkup = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(config.contentType),
    name: config.primaryTopic,
    description: `Comprehensive ${config.primaryTopic} resource for ${config.targetAudience.join(', ')}`,
    about: config.semanticKeywords.map(keyword => ({
      '@type': 'Thing',
      name: keyword,
    })),
    audience: {
      '@type': 'Audience',
      audienceType: config.targetAudience.join(', '),
    },
    educationalLevel: config.complexityLevel,
    inLanguage: 'en',
    isAccessibleForFree: true,
  };

  // Add governance-specific markup
  if (config.contentType === 'governance-page') {
    return {
      ...baseMarkup,
      '@type': 'SoftwareApplication',
      applicationCategory: 'GovernanceApplication',
      operatingSystem: 'Web Browser',
      featureList: [
        'Smart voting notifications',
        'Multi-signature wallet coordination',
        'Automated proposal tracking',
        'Cross-platform DAO integration',
        'Treasury management tools',
      ],
      isRelatedTo: [
        { '@type': 'SoftwareApplication', name: 'Snapshot' },
        { '@type': 'SoftwareApplication', name: 'Tally' },
        { '@type': 'SoftwareApplication', name: 'Aragon' },
        { '@type': 'SoftwareApplication', name: 'Safe' },
      ],
    };
  }

  return baseMarkup;
}

/**
 * Generates content relationship mapping for AI understanding
 */
export function generateContentRelationships(
  _primaryUrl: string,
  relatedPages: Array<{ url: string; topic: string; relevance: number }>
): Array<{ type: string; target: string; strength: number }> {
  return relatedPages.map(page => ({
    type: 'related-content',
    target: page.url,
    strength: page.relevance,
  }));
}

/**
 * Creates entity recognition data for AI systems
 */
export function generateEntityRecognition(config: AIContentConfig): string[] {
  const baseEntities = [
    '0xmail.box',
    'Web3',
    'blockchain',
    'email',
    'wallet',
    'cryptocurrency',
  ];

  const governanceEntities = [
    'DAO',
    'governance',
    'voting',
    'multi-sig',
    'Snapshot',
    'Tally',
    'Aragon',
    'Safe',
    'proposal',
    'community',
  ];

  if (config.contentType === 'governance-page') {
    return [...baseEntities, ...governanceEntities];
  }

  return baseEntities;
}

/**
 * Generates topic clustering data for AI content categorization
 */
export function generateTopicClustering(config: AIContentConfig): string[] {
  const baseClusters = [
    'web3-infrastructure',
    'email-technology',
    'blockchain-applications',
  ];

  const governanceClusters = [
    'dao-governance-tools',
    'voting-notification-systems',
    'community-management-platforms',
    'multi-signature-coordination',
    'treasury-management-solutions',
  ];

  if (config.contentType === 'governance-page') {
    return [...baseClusters, ...governanceClusters];
  }

  return baseClusters;
}

/**
 * Creates comprehensive AI-optimized structured data
 */
export function generateAIStructuredData(
  config: AIContentConfig,
  additionalData?: Partial<AIStructuredData>
): AIStructuredData {
  return {
    contentClassification: {
      type: config.contentType,
      topic: config.primaryTopic,
      audience: config.targetAudience.join(','),
      complexity: config.complexityLevel,
      purpose: config.contentPurpose,
      vertical: config.industryVertical,
    },
    semanticMarkup: generateSemanticMarkup(config),
    entityRecognition: generateEntityRecognition(config),
    topicClustering: generateTopicClustering(config),
    contentRelationships: additionalData?.contentRelationships || [],
    ...additionalData,
  };
}

/**
 * Helper function to get appropriate Schema.org type
 */
function getSchemaType(contentType: string): string {
  const typeMap: Record<string, string> = {
    article: 'Article',
    'landing-page': 'WebPage',
    'product-page': 'Product',
    'governance-page': 'SoftwareApplication',
    documentation: 'TechArticle',
  };

  return typeMap[contentType] || 'WebPage';
}

/**
 * Generates performance tracking schema for AI analytics
 */
export function generatePerformanceTrackingSchema(pageName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MonitorAction',
    name: `AI Performance Tracking - ${pageName}`,
    instrument: {
      '@type': 'SoftwareApplication',
      name: 'AI Analytics Platform',
    },
    measurementTechnique: [
      'User Engagement Metrics',
      'AI Content Understanding Score',
      'Semantic Relevance Analysis',
      'Conversion Optimization Tracking',
    ],
    result: {
      '@type': 'Dataset',
      name: `${pageName} Performance Data`,
      description: 'AI-optimized performance metrics and user interaction data',
    },
  };
}

/**
 * Predefined configurations for common page types
 */
export const aiOptimizationPresets = {
  governancePage: {
    contentType: 'governance-page' as const,
    primaryTopic: 'DAO Governance Communication Platform',
    semanticKeywords: [
      'DAO governance',
      'voting notifications',
      'multi-sig coordination',
      'proposal tracking',
      'community engagement',
      'treasury management',
    ],
    targetAudience: [
      'DAO members',
      'governance participants',
      'multi-sig signers',
      'protocol teams',
      'community managers',
    ],
    complexityLevel: 'intermediate' as const,
    contentPurpose: 'commercial' as const,
    industryVertical: 'blockchain-governance',
    technicalTags: [
      'snapshot',
      'tally',
      'aragon',
      'safe',
      'multi-sig',
      'voting',
      'proposals',
      'treasury',
    ],
    userIntent: [
      'improve-governance',
      'increase-participation',
      'coordinate-multi-sig',
      'track-proposals',
      'engage-community',
    ],
    conversionGoals: [
      'dao-integration',
      'governance-setup',
      'multi-sig-connection',
      'notification-activation',
    ],
  },

  landingPage: {
    contentType: 'landing-page' as const,
    primaryTopic: 'Web3 Email Platform',
    semanticKeywords: [
      'Web3 email',
      'wallet authentication',
      'ENS email',
      'SNS email',
      'blockchain email',
      'decentralized communication',
    ],
    targetAudience: [
      'Web3 users',
      'crypto enthusiasts',
      'blockchain developers',
      'DeFi users',
    ],
    complexityLevel: 'beginner' as const,
    contentPurpose: 'commercial' as const,
    industryVertical: 'web3-communication',
    technicalTags: [
      'ethereum',
      'solana',
      'ens',
      'sns',
      'wallet-connect',
      'metamask',
      'phantom',
    ],
    userIntent: [
      'create-web3-email',
      'connect-wallet',
      'secure-communication',
      'eliminate-passwords',
    ],
    conversionGoals: [
      'wallet-connection',
      'email-creation',
      'first-email-sent',
      'premium-upgrade',
    ],
  },
};

export default {
  generateAIMetaTags,
  generateSemanticMarkup,
  generateContentRelationships,
  generateEntityRecognition,
  generateTopicClustering,
  generateAIStructuredData,
  generatePerformanceTrackingSchema,
  aiOptimizationPresets,
};
