import { cn } from '../lib/utils';
export interface AudioWaveformProps { className?: string; }
export const audiowaveform = ({ className }: AudioWaveformProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default audiowaveform;
