import React from 'react';
import { cn } from '../../lib/utils';
import { colors, ui } from '@sudobility/design';

export interface ToggleGroupOption {
  /** Option value */
  value: string;
  /** Option label */
  label: React.ReactNode;
  /** Option icon */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** Available options */
  options: ToggleGroupOption[];
  /** Selected value (single select) */
  value?: string;
  /** Selected values (multi select) */
  values?: string[];
  /** Change handler (single select) */
  onChange?: (value: string) => void;
  /** Change handler (multi select) */
  onValuesChange?: (values: string[]) => void;
  /** Allow multiple selections */
  multiple?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Variant style */
  variant?: 'default' | 'outline';
  /** Additional className */
  className?: string;
  /**
   * What kind of group this is, which decides the ARIA the buttons carry.
   *
   * A segmented control looks the same whatever it does, but it does not
   * always *mean* the same thing, and a screen reader has to be told which:
   *
   * - `group` (default) — independent toggles. Buttons, `aria-pressed`.
   * - `tablist` — the segments switch panels. Tabs, `aria-selected`, and the
   *   panels are expected to be `tabpanel`s labelled by them. Without this a
   *   panel switcher announces as four unrelated buttons and the link to the
   *   panel is lost.
   * - `radiogroup` — one of N, where the choice is a value rather than a view.
   *
   * Presentation is untouched by it; only the roles change.
   */
  role?: 'group' | 'tablist' | 'radiogroup';
}

/** The button role and selected-state attribute each group kind implies. */
const GROUP_SEMANTICS = {
  group: { item: undefined, state: 'aria-pressed' },
  tablist: { item: 'tab', state: 'aria-selected' },
  radiogroup: { item: 'radio', state: 'aria-checked' },
} as const;

/**
 * ToggleGroup Component
 *
 * Group of toggle buttons for single or multiple selections.
 * Similar to iOS segmented control.
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   options={[
 *     { value: 'grid', label: 'Grid', icon: <GridIcon /> },
 *     { value: 'list', label: 'List', icon: <ListIcon /> }
 *   ]}
 *   value={viewMode}
 *   onChange={setViewMode}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   options={filters}
 *   values={selectedFilters}
 *   onValuesChange={setSelectedFilters}
 *   multiple
 *   size="sm"
 * />
 * ```
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  values = [],
  onChange,
  onValuesChange,
  multiple = false,
  size = 'md',
  variant = 'default',
  className,
  role = 'group',
}) => {
  const semantics = GROUP_SEMANTICS[role];
  const handleClick = (optionValue: string, disabled?: boolean) => {
    if (disabled) return;

    if (multiple) {
      const newValues = values.includes(optionValue)
        ? values.filter(v => v !== optionValue)
        : [...values, optionValue];
      onValuesChange?.(newValues);
    } else {
      onChange?.(optionValue);
    }
  };

  const isSelected = (optionValue: string) => {
    return multiple ? values.includes(optionValue) : value === optionValue;
  };

  // Size configurations
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2',
  };

  // Variant configurations
  const variantClasses = {
    default: {
      base: 'bg-muted',
      button: 'hover:bg-muted',
      selected: `${colors.component.card.default.base} ${colors.component.card.default.dark} shadow-sm`,
    },
    outline: {
      base: `border ${ui.border.default}`,
      button: 'hover:bg-muted',
      selected: 'bg-muted border-border',
    },
  };

  return (
    <div
      className={cn(
        'inline-flex rounded-lg p-1 gap-1',
        variantClasses[variant].base,
        className
      )}
      role={role}
    >
      {options.map(option => {
        const selected = isSelected(option.value);

        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value, option.disabled)}
            disabled={option.disabled}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-md font-medium',
              'transition-all duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[size],
              selected
                ? variantClasses[variant].selected
                : variantClasses[variant].button,
              selected ? 'text-foreground' : 'text-muted-foreground'
            )}
            {...(semantics.item ? { role: semantics.item } : {})}
            {...{ [semantics.state]: selected }}
          >
            {option.icon && (
              <span className='flex-shrink-0 w-4 h-4'>{option.icon}</span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
