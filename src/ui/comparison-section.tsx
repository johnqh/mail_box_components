import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { AnimatedSection } from './animated-section';

const sectionVariants = cva(
  "grid gap-8",
  {
    variants: {
      layout: {
        grid: "grid-cols-1 md:grid-cols-2",
        stacked: "grid-cols-1 space-y-8",
        cards: "grid-cols-1 md:grid-cols-2 gap-6"
      },
      spacing: {
        sm: "gap-4",
        md: "gap-8",
        lg: "gap-12"
      }
    },
    defaultVariants: {
      layout: "grid",
      spacing: "md"
    }
  }
);

const cardVariants = cva(
  "rounded-xl p-6 transition-all duration-300",
  {
    variants: {
      variant: {
        traditional: "bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-800/30 hover:border-red-200 dark:hover:border-red-700/50",
        web3: "bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800/30 hover:border-green-200 dark:hover:border-green-700/50",
        neutral: "bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-100 dark:border-gray-700/30 hover:border-gray-200 dark:hover:border-gray-600/50",
        elevated: "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
      },
      animation: {
        none: "",
        hover: "hover:transform hover:scale-[1.02]",
        float: "hover:-translate-y-1"
      }
    },
    defaultVariants: {
      variant: "traditional",
      animation: "hover"
    }
  }
);

const headerVariants = cva(
  "text-lg font-bold mb-4 flex items-center gap-3",
  {
    variants: {
      variant: {
        traditional: "text-red-600 dark:text-red-400",
        web3: "text-green-600 dark:text-green-400",
        neutral: "text-gray-900 dark:text-white",
        elevated: "text-gray-900 dark:text-white"
      }
    },
    defaultVariants: {
      variant: "traditional"
    }
  }
);

interface ComparisonItem {
  text: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  subtext?: string;
}

interface ComparisonData {
  title: string;
  icon?: React.ReactNode;
  items: ComparisonItem[];
  variant: 'traditional' | 'web3' | 'neutral' | 'elevated';
  badge?: {
    text: string;
    color?: 'red' | 'green' | 'blue' | 'gray';
  };
}

interface ComparisonSectionProps extends VariantProps<typeof sectionVariants> {
  className?: string;
  
  // Content
  title?: string;
  subtitle?: string;
  traditional: ComparisonData;
  web3: ComparisonData;
  
  // Styling
  cardAnimation?: 'none' | 'hover' | 'float';
  
  // Animation
  animate?: boolean;
  animationDelay?: number;
  
  // Custom icons
  traditionalIcon?: React.ReactNode;
  web3Icon?: React.ReactNode;
}

const defaultIcons = {
  traditional: "❌",
  web3: "✅",
  neutral: "ℹ️",
  elevated: "⭐"
};

const badgeColors = {
  red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
};

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  className,
  layout = "grid",
  spacing = "md",
  
  title,
  subtitle,
  traditional,
  web3,
  
  cardAnimation = "hover",
  
  animate = true,
  animationDelay = 0,
  
  traditionalIcon,
  web3Icon
}) => {
  const renderComparisonCard = (data: ComparisonData, index: number) => {
    const cardContent = (
      <div className={cn(cardVariants({ variant: data.variant, animation: cardAnimation }))}>
        {/* Header */}
        <div className={cn(headerVariants({ variant: data.variant }))}>
          <span className="text-2xl">
            {data.icon || 
             (index === 0 ? traditionalIcon : web3Icon) || 
             defaultIcons[data.variant]}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span>{data.title}</span>
              {data.badge && (
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  badgeColors[data.badge.color || 'gray']
                )}>
                  {data.badge.text}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Items */}
        <ul className="space-y-3">
          {data.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className={cn(
                "flex items-start gap-3 text-sm leading-relaxed",
                item.highlight && "font-medium"
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0 mt-0.5 text-base">
                  {item.icon}
                </span>
              )}
              <div className="flex-1">
                <span className={cn(
                  data.variant === 'traditional' 
                    ? "text-gray-700 dark:text-gray-300"
                    : data.variant === 'web3'
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-600 dark:text-gray-400"
                )}>
                  {item.text}
                </span>
                {item.subtext && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {item.subtext}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );

    return animate ? (
      <AnimatedSection
        key={data.title}
        animation="fade-in-up"
        delay={animationDelay + (index * 200)}
      >
        {cardContent}
      </AnimatedSection>
    ) : (
      <div key={data.title}>
        {cardContent}
      </div>
    );
  };

  const sectionContent = (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center space-y-4">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Comparison Grid */}
      <div className={cn(sectionVariants({ layout, spacing }))}>
        {renderComparisonCard(traditional, 0)}
        {renderComparisonCard(web3, 1)}
      </div>
    </div>
  );

  return animate ? (
    <AnimatedSection animation="fade-in-up" delay={animationDelay}>
      {sectionContent}
    </AnimatedSection>
  ) : (
    sectionContent
  );
};

// Helper function to create comparison data
export const createComparisonData = (
  title: string,
  items: (string | ComparisonItem)[],
  variant: 'traditional' | 'web3' | 'neutral' | 'elevated',
  options?: {
    icon?: React.ReactNode;
    badge?: ComparisonData['badge'];
  }
): ComparisonData => ({
  title,
  variant,
  items: items.map(item => 
    typeof item === 'string' ? { text: item } : item
  ),
  ...options
});

// Predefined comparison examples - for backward compatibility
// Note: These should be moved to consuming application with proper localization
export const createEmailComparisonData = (labels?: {
  traditionalTitle?: string;
  web3Title?: string;
  traditionalItems?: { text: string; icon: string }[];
  web3Items?: { text: string; icon: string }[];
  traditionalBadge?: string;
  web3Badge?: string;
}) => {
  const defaultTraditionalItems = [
    { text: "Create account with email/password", icon: "🔑" },
    { text: "Remember multiple passwords", icon: "🧠" },
    { text: "Verify email address", icon: "📧" },
    { text: "Risk of password theft", icon: "⚠️" },
    { text: "Data stored on company servers", icon: "🏢" },
    { text: "Account can be locked/suspended", icon: "🔒" }
  ];

  const defaultWeb3Items = [
    { text: "Connect your wallet", icon: "🔗" },
    { text: "No passwords needed", icon: "🚫" },
    { text: "Instant authentication", icon: "⚡" },
    { text: "Cryptographically secure", icon: "🔐" },
    { text: "You own your data", icon: "👑" },
    { text: "Censorship resistant", icon: "🛡️" }
  ];

  return {
    traditional: createComparisonData(
      labels?.traditionalTitle || "Traditional Email",
      labels?.traditionalItems || defaultTraditionalItems,
      'traditional',
      { badge: { text: labels?.traditionalBadge || "Old Way", color: "red" } }
    ),
    
    web3: createComparisonData(
      labels?.web3Title || "Web3 Email",
      labels?.web3Items || defaultWeb3Items,
      'web3',
      { badge: { text: labels?.web3Badge || "New Way", color: "green" } }
    )
  };
};

export default ComparisonSection;