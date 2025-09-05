import * as React from "react"
import { Link } from "react-router-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { textVariants } from "../../design-system"

const smartLinkVariants = cva(
  "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        // Subtle internal link - barely noticeable color change
        subtle: textVariants.link.subtle(),
        // Default internal link 
        default: textVariants.link.default(),
        // Muted link for secondary navigation
        muted: textVariants.link.muted(),
        // External link with indicator
        external: textVariants.link.external(),
        // Inherit parent styling with minimal changes
        inherit: "text-inherit hover:text-blue-600 dark:hover:text-blue-400 underline-offset-2 hover:underline transition-colors duration-200",
      },
      size: {
        sm: "text-sm",
        default: "text-base", 
        lg: "text-lg",
      }
    },
    defaultVariants: {
      variant: "subtle",
      size: "default",
    },
  }
)

export interface SmartLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof smartLinkVariants> {
  to?: string
  href?: string
  external?: boolean
  children: React.ReactNode
}

const SmartLink = React.forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ className, variant, size, to, href, external, children, ...props }, ref) => {
    const destination = to || href
    
    if (!destination) {
      return (
        <span 
          className={cn(smartLinkVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </span>
      )
    }

    // External links (http/https or explicitly marked as external)
    if (external || destination.startsWith('http') || destination.startsWith('mailto:')) {
      return (
        <a
          className={cn(smartLinkVariants({ 
            variant: variant === 'subtle' ? 'external' : variant, 
            size, 
            className 
          }))}
          href={destination}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          {children}
        </a>
      )
    }

    // Internal React Router links
    return (
      <Link
        className={cn(smartLinkVariants({ variant, size, className }))}
        to={destination}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

SmartLink.displayName = "SmartLink"

// Text content analyzer to create links from plain text
export const useSmartLinks = (content: string, linkMappings: Record<string, string>) => {
  return React.useMemo(() => {
    let processedContent = content
    
    Object.entries(linkMappings).forEach(([text, path]) => {
      // Create a case-insensitive regex that preserves original case
      const regex = new RegExp(`\\b${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      processedContent = processedContent.replace(regex, (match) => 
        `<SmartLink to="${path}" variant="subtle">${match}</SmartLink>`
      )
    })
    
    return processedContent
  }, [content, linkMappings])
}

// Higher-order component to automatically linkify content
export interface SmartContentProps {
  children: string
  mappings?: Record<string, string>
  className?: string
  variant?: VariantProps<typeof smartLinkVariants>['variant']
}

const defaultMappings: Record<string, string> = {
  'documentation': '/document',
  'settings': '/settings', 
  'about': '/about',
  'contact': '/contact',
  'privacy policy': '/privacy',
  'privacy': '/privacy',
  'terms of service': '/terms',
  'terms': '/terms',
  'cookie policy': '/cookies',
  'cookies': '/cookies',
  'points': '/points',
  'earn points': '/how-to-earn-points',
  'how to earn points': '/how-to-earn-points',
  'connect wallet': '/connect',
  'connect your wallet': '/connect',
  'wallet connection': '/connect',
  'wallet': '/connect',
  'compose': '/compose',
  'compose email': '/compose',
  'send email': '/compose',
  'mail': '/mail',
  'email': '/mail',
  'inbox': '/mail',
  'dashboard': '/mail',
  'delegate': '/delegate',
  'delegation': '/delegate',
  'manage': '/manage',
  'manage preferences': '/preferences',
  'profile': '/settings',
  'account': '/settings',
  'preferences': '/preferences',
  'token': '/token',
  'web3 users': '/web3-users',
  'web3 projects': '/web3-projects',
  'get started': '/connect',
  'start here': '/connect',
  'learn more': '/document',
  'read more': '/document',
  'our features': '/document',
  'support': '/contact',
  'help': '/document',
  'contact us': '/contact'
}

export const SmartContent: React.FC<SmartContentProps> = ({ 
  children, 
  mappings = defaultMappings, 
  className,
  variant = 'subtle'
}) => {
  const processedContent = React.useMemo(() => {
    // Handle undefined or empty children
    if (!children || typeof children !== 'string') {
      return children || ''
    }
    
    let content = children
    
    // Sort by length (longest first) to avoid partial replacements
    const sortedMappings = Object.entries(mappings).sort(([a], [b]) => b.length - a.length)
    
    sortedMappings.forEach(([text, path]) => {
      if (text && path) {
        const regex = new RegExp(`\\b${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
        content = content.replace(regex, (match) => `__LINK_START__${path}__LINK_MID__${match}__LINK_END__`)
      }
    })
    
    return content
  }, [children, mappings])
  
  if (!processedContent || typeof processedContent !== 'string') {
    return <span className={className}>{children}</span>
  }
  
  const parts = processedContent.split(/(__LINK_START__.*?__LINK_END__)/)
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        const linkMatch = part.match(/__LINK_START__(.*?)__LINK_MID__(.*?)__LINK_END__/)
        if (linkMatch) {
          const [, path, text] = linkMatch
          return (
            <SmartLink key={index} to={path} variant={variant}>
              {text}
            </SmartLink>
          )
        }
        return part
      })}
    </span>
  )
}

export { SmartLink, smartLinkVariants }