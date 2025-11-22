import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /** Content to portal */
  children: React.ReactNode;
  /** Target container (defaults to document.body) */
  container?: Element | null;
}

/**
 * Portal Component
 *
 * Renders children into a DOM node outside the parent component's hierarchy.
 * Useful for modals, tooltips, and overlays that need to break out of z-index stacking.
 *
 * @example
 * ```tsx
 * <Portal>
 *   <Modal>Content</Modal>
 * </Portal>
 * ```
 *
 * @example
 * ```tsx
 * <Portal container={customElement}>
 *   <Tooltip>Tooltip content</Tooltip>
 * </Portal>
 * ```
 */
export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const target = container || document.body;

  return createPortal(children, target);
};

export default Portal;
