
import { cn } from '../lib/utils';

export interface AuditLogProps {
  className?: string;
}

export const auditlog = ({ className }: AuditLogProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default auditlog;
