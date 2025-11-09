import { cn } from '../lib/utils';
export interface NpsSurveyProps { className?: string; }
export const npssurvey = ({ className }: NpsSurveyProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default npssurvey;
