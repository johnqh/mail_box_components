import { cn } from '../lib/utils';
export interface CertificateProps { className?: string; }
export const certificate = ({ className }: CertificateProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default certificate;
