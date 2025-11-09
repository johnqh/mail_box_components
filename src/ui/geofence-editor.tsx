import { cn } from '../lib/utils';
export interface GeofenceEditorProps { className?: string; }
export const geofenceeditor = ({ className }: GeofenceEditorProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default geofenceeditor;
