import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@sudobility/components';

export interface MentionOption {
  /** Option ID */
  id: string;
  /** Display label */
  label: string;
  /** Optional avatar/icon */
  avatar?: string;
  /** Optional metadata */
  metadata?: string;
}

export interface MentionInputProps {
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Mention options */
  mentions: MentionOption[];
  /** Mention trigger character */
  trigger?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * MentionInput Component
 *
 * Text input with mention/tag suggestions.
 * Triggers dropdown when typing @ or custom character.
 *
 * @example
 * ```tsx
 * <MentionInput
 *   value={message}
 *   onChange={setMessage}
 *   mentions={users}
 *   placeholder="Type @ to mention someone"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <MentionInput
 *   value={text}
 *   onChange={handleChange}
 *   mentions={contacts}
 *   trigger="@"
 * />
 * ```
 */
export const MentionInput: React.FC<MentionInputProps> = ({
  value,
  onChange,
  mentions,
  trigger = '@',
  placeholder = 'Type a message...',
  disabled = false,
  className,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredMentions, setFilteredMentions] = useState<MentionOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursor = e.target.selectionStart || 0;

    onChange(newValue);
    setCursorPosition(cursor);

    // Check for mention trigger
    const textBeforeCursor = newValue.substring(0, cursor);
    const words = textBeforeCursor.split(/\s/);
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith(trigger)) {
      const query = lastWord.substring(trigger.length);

      // Filter mentions
      const filtered = mentions.filter(m =>
        m.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMentions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle mention selection
  const selectMention = (mention: MentionOption) => {
    const textBeforeCursor = value.substring(0, cursorPosition);
    const textAfterCursor = value.substring(cursorPosition);

    // Find the start of the mention
    const words = textBeforeCursor.split(/\s/);
    const lastWord = words[words.length - 1];
    const mentionStart = textBeforeCursor.length - lastWord.length;

    // Replace the mention query with selected mention
    const newValue =
      value.substring(0, mentionStart) +
      trigger +
      mention.label +
      ' ' +
      textAfterCursor;

    onChange(newValue);
    setShowSuggestions(false);

    // Focus input
    if (inputRef.current) {
      const newCursor =
        mentionStart + trigger.length + mention.label.length + 1;
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(newCursor, newCursor);
      }, 0);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredMentions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredMentions[selectedIndex]) {
          selectMention(filteredMentions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        break;
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative w-full', className)}>
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full px-3 py-2 text-sm',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-none',
          'min-h-[100px]'
        )}
      />

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto'
        >
          {filteredMentions.map((mention, index) => (
            <button
              key={mention.id}
              onClick={() => selectMention(mention)}
              className={cn(
                'w-full px-3 py-2 text-left flex items-center gap-3',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'transition-colors',
                index === selectedIndex && 'bg-blue-50 dark:bg-blue-900/30'
              )}
            >
              {mention.avatar && (
                <img
                  src={mention.avatar}
                  alt={mention.label}
                  className='w-8 h-8 rounded-full'
                />
              )}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                  {mention.label}
                </p>
                {mention.metadata && (
                  <p className='text-xs text-gray-600 dark:text-gray-400 truncate'>
                    {mention.metadata}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
