// Common SEO keywords used across the platform
export const BASE_KEYWORDS = [
  "Web3 email platform",
  "wallet email",
  "ENS email",
  "SNS email",
  "smart contract integration",
  "decentralized email",
  "blockchain messaging",
  "crypto email",
  "Web3 communication",
  "secure email"
];

export const USER_FOCUSED_KEYWORDS = [
  "Web3 email for users",
  "wallet email address",
  "passwordless email",
  "secure Web3 communication",
  "ENS domain email",
  "SNS domain email",
  "crypto wallet email",
  "Web2 Web3 bridge",
  "decentralized identity",
  "blockchain email"
];

export const DEVELOPER_KEYWORDS = [
  "Web3 email API",
  "smart contract email integration",
  "blockchain developer tools",
  "Web3 SDK",
  "decentralized messaging API",
  "smart contract notifications",
  "Web3 developer platform",
  "blockchain email service",
  "crypto developer tools",
  "Web3 infrastructure"
];

export const DOCUMENTATION_KEYWORDS = [
  "Web3 email documentation",
  "wallet email guide",
  "ENS email setup",
  "SNS email integration",
  "smart contract email API",
  "Web3 communication docs",
  "blockchain email tutorial",
  "crypto wallet email",
  "decentralized email guide",
  "Web3 developer documentation"
];

export const COMPANY_KEYWORDS = [
  "about 0xmail.box",
  "Web3 email team",
  "blockchain email company",
  "crypto email platform",
  "decentralized email team",
  "wallet email founders",
  "Web3 communication team",
  "blockchain messaging company",
  "ENS email team",
  "crypto startup team"
];

export const WEB3_TRENDING_KEYWORDS = [
  "DeFi email notifications",
  "DAO communication platform",
  "NFT email alerts",
  "crypto airdrop notifications",
  "Web3 social platform",
  "blockchain KYC email",
  "DeFi yield farming alerts",
  "GameFi notification system",
  "Layer 2 email integration",
  "cross-chain messaging protocol",
  "multichain email support",
  "decentralized identity verification",
  "Web3 reputation system",
  "crypto compliance email"
];

export const TECHNICAL_SEO_KEYWORDS = [
  "EIP-712 signature authentication",
  "SIWE Sign-In with Ethereum",
  "multi-signature wallet email",
  "hardware wallet email support",
  "Web3 API integration",
  "smart contract event notifications",
  "IPFS email storage",
  "ENS subdomain email routing",
  "Chainlink oracle integration",
  "Web3 SDK documentation",
  "blockchain webhook notifications",
  "crypto API endpoints",
  "decentralized email protocol",
  "Web3 developer tools"
];

export const ACCESSIBILITY_KEYWORDS = [
  "accessible Web3 email",
  "screen reader crypto wallet",
  "Web3 accessibility features",
  "inclusive blockchain platform",
  "accessible wallet integration",
  "Web3 WCAG compliance",
  "keyboard navigation Web3",
  "voice control crypto email",
  "high contrast Web3 interface",
  "accessible blockchain tools"
];

// Helper function to combine keywords
export const combineKeywords = (...keywordSets: string[][]): string[] => {
  const combined = new Set<string>();
  keywordSets.forEach(set => set.forEach(keyword => combined.add(keyword)));
  return Array.from(combined);
};

// Page-specific keyword getters
export const getHomePageKeywords = () => combineKeywords(BASE_KEYWORDS, USER_FOCUSED_KEYWORDS, WEB3_TRENDING_KEYWORDS);
export const getAboutPageKeywords = () => combineKeywords(BASE_KEYWORDS, COMPANY_KEYWORDS);
export const getDocumentationKeywords = () => combineKeywords(BASE_KEYWORDS, DOCUMENTATION_KEYWORDS, TECHNICAL_SEO_KEYWORDS);
export const getUserPageKeywords = () => combineKeywords(BASE_KEYWORDS, USER_FOCUSED_KEYWORDS, ACCESSIBILITY_KEYWORDS);
export const getDeveloperPageKeywords = () => combineKeywords(BASE_KEYWORDS, DEVELOPER_KEYWORDS, TECHNICAL_SEO_KEYWORDS);
export const getWeb3ProjectsKeywords = () => combineKeywords(BASE_KEYWORDS, DEVELOPER_KEYWORDS, WEB3_TRENDING_KEYWORDS);
export const getSubscriptionKeywords = () => combineKeywords(BASE_KEYWORDS, WEB3_TRENDING_KEYWORDS, TECHNICAL_SEO_KEYWORDS);
export const getContactKeywords = () => combineKeywords(BASE_KEYWORDS, COMPANY_KEYWORDS, ACCESSIBILITY_KEYWORDS);