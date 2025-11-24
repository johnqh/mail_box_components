import React, { useState, useRef, useEffect } from 'react';
import { cn, Portal } from '@sudobility/components';

export interface HoverCardProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Card content */
  children: React.ReactNode;
  /** Placement relative to trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  openDelay?: number;
  /** Delay before hiding (ms) */
  closeDelay?: number;
  /** Additional className */
  className?: string;
}

/**
 * HoverCard Component
 *
 * Rich content card that appears on hover.
 * Useful for user profiles, previews, and contextual information.
 *
 * @example
 * ```tsx
 * <HoverCard
 *   trigger={<span>@username</span>}
 *   placement="top"
 * >
 *   <div className="p-4">
 *     <h3>User Profile</h3>
 *     <p>Bio information...</p>
 *   </div>
 * </HoverCard>
 * ```
 *
 * @example
 * ```tsx
 * <HoverCard
 *   trigger={<img src={avatar} alt="Avatar" />}
 *   openDelay={500}
 * >
 *   <UserCard user={userData} />
 * </HoverCard>
 * ```
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  children,
  placement = 'bottom',
  openDelay = 200,
  closeDelay = 300,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Calculate position
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const gap = 8;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - gap;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + gap;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.left - gap;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.right + gap;
          break;
      }

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, placement]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  };

  // Transform configurations
  const transformOrigin = {
    top: 'origin-bottom',
    bottom: 'origin-top',
    left: 'origin-right',
    right: 'origin-left',
  };

  const transformTranslate = {
    top: '-translate-x-1/2 -translate-y-full',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2',
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='inline-block'
      >
        {trigger}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={cardRef}
            className={cn(
              'fixed z-50',
              'bg-white dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700',
              'rounded-lg shadow-lg',
              'transition-all duration-200',
              'animate-in fade-in zoom-in-95',
              transformOrigin[placement],
              transformTranslate[placement],
              className
            )}
            style={{
              top: position.top + 'px',
              left: position.left + 'px',
            }}
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default HoverCard;
