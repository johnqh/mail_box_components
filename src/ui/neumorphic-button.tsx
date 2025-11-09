import { cn } from '../lib/utils';
export interface NeumorphicButtonProps { className?: string; }
export const neumorphicbutton = ({ className }: NeumorphicButtonProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default neumorphicbutton;
