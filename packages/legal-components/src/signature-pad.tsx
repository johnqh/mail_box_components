import { cn } from '@sudobility/components';

export interface SignaturePadProps {
  onSave?: (signature: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

export const SignaturePad = ({
  onSave,
  width = 400,
  height = 200,
  className,
}: SignaturePadProps) => {
  return (
    <div
      className={cn(
        'border border-gray-300 dark:border-gray-700 rounded-lg',
        className
      )}
    >
      <canvas
        width={width}
        height={height}
        className='bg-white dark:bg-gray-900'
      />
      <div className='flex gap-2 p-2'>
        <button className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Clear
        </button>
        <button
          onClick={() => onSave?.('')}
          className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Save
        </button>
      </div>
    </div>
  );
};
