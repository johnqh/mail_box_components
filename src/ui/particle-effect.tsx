import { cn } from '../lib/utils';
export interface ParticleEffectProps { className?: string; }
export const particleeffect = ({ className }: ParticleEffectProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default particleeffect;
