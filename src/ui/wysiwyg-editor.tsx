import { cn } from '../lib/utils';

export interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const WysiwygEditor = ({
  value,
  onChange,
  placeholder,
  className,
}: WysiwygEditorProps) => {
  return (
    <div
      className={cn(
        'border border-gray-300 dark:border-gray-700 rounded-lg',
        className
      )}
    >
      <div className='flex gap-1 p-2 border-b border-gray-300 dark:border-gray-700'>
        {['B', 'I', 'U', 'H1', 'H2', 'List', 'Link'].map(btn => (
          <button
            key={btn}
            className='px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm font-semibold'
          >
            {btn}
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none'
        rows={10}
      />
    </div>
  );
};

export default WysiwygEditor;
