import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"
import { variants } from "../design-system"

const buttonVariants = cva(
  "min-h-[44px] touch-manipulation",
  {
    variants: {
      variant: {
        // Primary variants using design system tokens
        default: variants.button.primary.default(),
        primary: variants.button.primary.default(),
        
        // Secondary variants
        secondary: variants.button.secondary.default(),
        
        // Outline variant
        outline: variants.button.outline.default(),
        
        // Ghost variant (mapped to outline for consistency)
        ghost: variants.button.outline.default().replace('border border-gray-300 dark:border-gray-600', 'border-transparent'),
        
        // Destructive variants
        destructive: variants.button.destructive.default(),
        "destructive-outline": variants.button.destructive.outline(),
        
        // Success variant (fallback to hardcoded since not in design system)
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 border-transparent focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
        
        // Link variant (using ui.text.link)
        link: "bg-transparent hover:bg-transparent active:bg-transparent border-transparent underline-offset-4 hover:underline disabled:no-underline p-0 text-blue-600 dark:text-blue-400 transition-colors duration-150",
        
        // Gradient variants
        gradient: variants.button.gradient.primary(),
        "gradient-secondary": variants.button.gradient.secondary(),
        "gradient-success": variants.button.gradient.success(),
        
        // Web3 specific variants
        wallet: variants.button.web3.wallet(),
        connect: variants.button.web3.connect(),
        disconnect: variants.button.web3.disconnect(),
      },
      size: {
        default: "", // Size handled by design system tokens
        sm: "h-8", // Override height for small
        lg: "h-12", // Override height for large
        icon: "h-10 w-10 p-0",
      },
      animation: {
        none: "transition-colors duration-200",
        hover: variants.animations.hover.button.lift(),
        lift: variants.animations.hover.button.lift(),
        scale: variants.animations.hover.button.scale(),
        glow: variants.animations.hover.button.glow(),
        shimmer: variants.animations.hover.button.shimmer(),
        tap: variants.animations.feedback.tap.scale(),
        connect: variants.animations.hover.button.connect(),
        transaction: variants.animations.hover.button.transaction(),
        disconnect: variants.animations.hover.button.disconnect(),
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "hover",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Get design system button class based on variant and size
    const getDesignSystemClass = () => {
      if (variant && size && size !== 'default' && size !== 'icon') {
        // Use size-specific design system tokens
        const sizeMap = { sm: 'small', lg: 'large' } as const;
        const dsSize = sizeMap[size as keyof typeof sizeMap];
        
        if (variant === 'primary' || variant === 'default') {
          return variants.button.primary[dsSize]();
        } else if (variant === 'secondary') {
          return variants.button.secondary[dsSize]();
        } else if (variant === 'outline') {
          return variants.button.outline[dsSize]();
        } else if (variant === 'destructive') {
          // Fallback for destructive - not all sizes supported
          return '';
        }
      }
      return '';
    };
    
    const designSystemClass = getDesignSystemClass();
    
    return (
      <Comp
        className={cn(
          designSystemClass || buttonVariants({ variant, size, animation }),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }