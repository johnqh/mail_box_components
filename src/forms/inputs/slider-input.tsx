import { cn } from '../../lib/utils';

export interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  className?: string;
}

export const SliderInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  className,
}: SliderInputProps) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className='flex-1 accent-blue-500'
      />
      {showValue && (
        <span className='w-12 text-center font-semibold text-gray-900 dark:text-white'>
          {value}
        </span>
      )}
    </div>
  );
};
