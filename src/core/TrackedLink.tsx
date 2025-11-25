import React from 'react';

// Type for tracking link click events
export interface LinkClickTrackingParams {
  link_text: string;
  link_url: string;
  to_page: string;
  navigation_type: string;
  component_name?: string;
  [key: string]: unknown; // Allow additional tracking parameters
}

export type LinkTrackingFunction = (params: LinkClickTrackingParams) => void;

// Generic props that work with any Link component
interface TrackedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  to?: string | { pathname?: string; [key: string]: any };
  href?: string; // For regular anchor tags
  trackingLabel?: string;
  componentName?: string;
  onTrack?: LinkTrackingFunction; // Optional tracking function
  trackingParams?: Record<string, unknown>; // Additional tracking parameters
  // Link component to use (e.g., React Router's Link, Next.js Link, etc.)
  LinkComponent?: React.ComponentType<any>;
  // Additional props to pass to the Link component
  linkProps?: Record<string, any>;
}

/**
 * TrackedLink - Enhanced Link component with automatic analytics tracking
 *
 * Features:
 * - Automatically tracks link clicks with customizable parameters
 * - Framework agnostic - works with any Link component (React Router, Next.js, etc.)
 * - Falls back to regular anchor tags if no LinkComponent provided
 * - Flexible tracking function injection for different analytics providers
 * - Extracts link text automatically for tracking labels
 * - Type-safe tracking parameter interface
 *
 * @param to - Destination URL or route object (for router Links)
 * @param href - Destination URL (for anchor tags)
 * @param LinkComponent - Link component to use (e.g., React Router's Link)
 * @param onTrack - Optional function to handle tracking events
 * @param trackingLabel - Custom label for tracking (defaults to link text)
 * @param componentName - Name of the component for context
 * @param trackingParams - Additional parameters to include in tracking
 * @param linkProps - Additional props to pass to the Link component
 */
export const TrackedLink: React.FC<TrackedLinkProps> = ({
  children,
  onClick,
  to,
  href,
  trackingLabel,
  componentName,
  onTrack,
  trackingParams = {},
  LinkComponent,
  linkProps = {},
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the link click if tracking function is provided
    if (onTrack) {
      // Extract link text for tracking
      const linkText =
        trackingLabel ||
        (typeof children === 'string' ? children : '') ||
        'Unknown Link';

      // Extract destination URL
      const linkUrl = (() => {
        if (to) {
          return typeof to === 'string' ? to : to.pathname || '';
        }
        if (href) {
          return href;
        }
        return '';
      })();

      // Call tracking function with comprehensive parameters
      onTrack({
        link_text: linkText,
        link_url: linkUrl,
        to_page: linkUrl,
        navigation_type: LinkComponent ? 'router_link' : 'anchor_link',
        component_name: componentName,
        ...trackingParams, // Spread additional tracking parameters
      });
    }

    // Call original onClick handler
    if (onClick) {
      onClick(event);
    }
  };

  // Use provided LinkComponent if available
  if (LinkComponent && to !== undefined) {
    return (
      <LinkComponent {...linkProps} to={to} onClick={handleClick} {...props}>
        {children}
      </LinkComponent>
    );
  }

  // Fall back to regular anchor tag
  const finalHref = to
    ? typeof to === 'string'
      ? to
      : to.pathname || '#'
    : href;

  return (
    <a {...props} href={finalHref} onClick={handleClick}>
      {children}
    </a>
  );
};
