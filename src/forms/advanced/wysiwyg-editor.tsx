import { cn } from '../../lib/utils';
import { colors, ui } from '@sudobility/design';

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
    <div className={cn('border rounded-lg', ui.border.default, className)}>
      <div className={cn('flex gap-1 p-2 border-b', ui.border.default)}>
        {['B', 'I', 'U', 'H1', 'H2', 'List', 'Link'].map(btn => (
          <button
            key={btn}
            className={cn(
              'px-3 py-1 rounded text-sm font-semibold',
              colors.component.button.ghost.base,
              colors.component.button.ghost.dark
            )}
          >
            {btn}
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full p-4 resize-none focus:outline-none',
          ui.background.surface
        )}
        rows={10}
      />
    </div>
  );
};
