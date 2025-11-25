/**
 * NoContent component - Backward compatibility wrapper for EmptyState
 *
 * @deprecated Use EmptyState instead. This component is maintained for backward compatibility.
 */

import React from 'react';
import { EmptyState } from './empty-state';

interface NoContentProps {
  title: string;
  subtext: string;
  className?: string;
}

export const NoContent: React.FC<NoContentProps> = ({
  title,
  subtext,
  className,
}) => {
  return (
    <EmptyState title={title} description={subtext} className={className} />
  );
};
