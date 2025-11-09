import { cn } from '../lib/utils';
export interface WalletConnectProps { className?: string; }
export const walletconnect = ({ className }: WalletConnectProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default walletconnect;
