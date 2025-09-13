import React from "react";
import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export interface PromotionalBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonIcon?: "envelope" | "arrow" | "both" | "none";
  variant?: "default" | "prominent";
  badgeText?: string;
  prominentBadgeText?: string;
  onButtonClick: () => void;
  className?: string;
}

/**
 * PromotionalBanner - A flexible promotional banner component
 * 
 * Features:
 * - Two visual variants (default and prominent)
 * - Customizable icons (envelope, arrow, both, or none)
 * - Animated badge with pulse effect
 * - Gradient backgrounds and hover effects
 * - Responsive design
 * - Dark mode support
 * 
 * @param title - Main banner title text
 * @param subtitle - Optional subtitle text
 * @param buttonText - Text to display on the CTA button
 * @param buttonIcon - Icon configuration for the button
 * @param variant - Visual variant (default or prominent)
 * @param badgeText - Text for the badge in default variant
 * @param prominentBadgeText - Text for the badge in prominent variant
 * @param onButtonClick - Callback when the CTA button is clicked
 * @param className - Additional CSS classes
 */
const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  subtitle,
  buttonText,
  buttonIcon = "envelope",
  variant = "default",
  badgeText = "FREE",
  prominentBadgeText = "100% Free",
  onButtonClick,
  className = "",
}) => {
  const renderStartIcon = () => {
    if (buttonIcon === "envelope" || buttonIcon === "both") {
      return (
        <EnvelopeIcon
          className={variant === "prominent" ? "h-5 w-5 mr-2" : "h-4 w-4 mr-1"}
        />
      );
    }
    if (buttonIcon === "none") {
      return null;
    }
    // Default email SVG for other cases
    return (
      <svg
        className={variant === "prominent" ? "h-5 w-5 mr-2" : "h-4 w-4 mr-1"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
      </svg>
    );
  };

  const renderEndIcon = () => {
    if (buttonIcon === "arrow" || buttonIcon === "both") {
      return <ArrowRightIcon className="h-4 w-4 ml-2" />;
    }
    return null;
  };

  const getBorderClass = () => {
    if (variant === "prominent") {
      return "border-b-2 border-green-200 dark:border-green-700";
    }
    return "border-b border-green-200 dark:border-green-700";
  };

  const getButtonClasses = () => {
    const baseClasses =
      "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 inline-flex items-center whitespace-nowrap cursor-pointer";

    if (variant === "prominent") {
      return `${baseClasses} px-8 py-3 text-base`;
    }
    return `${baseClasses} px-6 py-2 text-sm`;
  };

  const getTitleClasses = () => {
    if (variant === "prominent") {
      return "text-green-800 dark:text-green-200 font-semibold text-lg";
    }
    return "text-green-800 dark:text-green-200 font-semibold";
  };

  const displayBadgeText = variant === "prominent" ? prominentBadgeText : badgeText;

  return (
    <div
      className={`bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 ${getBorderClass()} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            className={`flex items-center ${variant === "prominent" ? "text-center sm:text-left" : ""}`}
          >
            <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3 animate-pulse">
              {displayBadgeText}
            </div>
            <div>
              <span className={getTitleClasses()}>{title}</span>
              {subtitle && (
                <span className="text-green-700 dark:text-green-300 text-sm block">
                  {subtitle}
                </span>
              )}
            </div>
          </div>
          <button onClick={onButtonClick} className={getButtonClasses()}>
            {renderStartIcon()}
            {buttonText}
            {renderEndIcon()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;