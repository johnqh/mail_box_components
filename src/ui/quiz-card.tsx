import { cn } from '../lib/utils';
export interface QuizCardProps { className?: string; }
export const quizcard = ({ className }: QuizCardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default quizcard;
