import React, { useState } from 'react';
import { cn } from '@sudobility/components';

export interface EmojiReaction {
  emoji: string;
  count: number;
  users?: string[];
  reacted?: boolean;
}

export interface ReactionProps {
  /** Available reactions */
  reactions: EmojiReaction[];
  /** Reaction click handler */
  onReact?: (emoji: string) => void;
  /** Show picker */
  showPicker?: boolean;
  /** Available emojis for picker */
  availableEmojis?: string[];
  /** Additional className */
  className?: string;
}

/**
 * Reaction Component
 *
 * Emoji reaction picker and display.
 * Shows reaction counts and allows users to add reactions.
 *
 * @example
 * ```tsx
 * <Reaction
 *   reactions={[
 *     { emoji: '👍', count: 5, reacted: true },
 *     { emoji: '❤️', count: 3 },
 *     { emoji: '😊', count: 2 }
 *   ]}
 *   availableEmojis={['👍', '❤️', '😊', '🎉', '🔥', '👏']}
 *   onReact={(emoji) => handleReaction(emoji)}
 *   showPicker
 * />
 * ```
 */
export const Reaction: React.FC<ReactionProps> = ({
  reactions,
  onReact,
  showPicker = true,
  availableEmojis = ['👍', '❤️', '😊', '🎉', '🔥', '👏', '👀', '🚀'],
  className,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleReactionClick = (emoji: string) => {
    if (onReact) {
      onReact(emoji);
    }
  };

  return (
    <div
      className={cn('relative flex flex-wrap items-center gap-2', className)}
    >
      {/* Existing reactions */}
      {reactions.map(reaction => (
        <button
          key={reaction.emoji}
          onClick={() => handleReactionClick(reaction.emoji)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all',
            'border-2',
            reaction.reacted
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              : 'bg-gray-100 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
          )}
        >
          <span className='text-lg leading-none'>{reaction.emoji}</span>
          <span
            className={cn(
              'text-sm font-medium',
              reaction.reacted
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300'
            )}
          >
            {reaction.count}
          </span>
        </button>
      ))}

      {/* Add reaction button */}
      {showPicker && (
        <div className='relative'>
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
          >
            <svg
              className='w-5 h-5 text-gray-600 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          </button>

          {/* Emoji picker */}
          {isPickerOpen && (
            <>
              {/* Backdrop */}
              <div
                className='fixed inset-0 z-10'
                onClick={() => setIsPickerOpen(false)}
              />

              {/* Picker */}
              <div className='absolute z-20 bottom-full mb-2 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-2'>
                <div className='grid grid-cols-4 gap-1'>
                  {availableEmojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        handleReactionClick(emoji);
                        setIsPickerOpen(false);
                      }}
                      className='w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors'
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
