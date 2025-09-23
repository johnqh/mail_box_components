import React, { useState } from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

export interface CodeExampleBlockProps {
  title: string;
  description?: string;
  code: string;
  preview?: React.ReactNode;
  language?: string;
  showBrowserChrome?: boolean;
  copyKey?: string;
}

export const CodeExampleBlock: React.FC<CodeExampleBlockProps> = ({
  title,
  description,
  code,
  preview,
  language = 'tsx',
  showBrowserChrome = true,
  copyKey,
}) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const finalCopyKey = copyKey || `${title}-code`;
  const isCopied = copiedStates[finalCopyKey];

  return (
    <div className='space-y-6'>
      {/* Title and Description */}
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          {title}
        </h3>
        {description && (
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            {description}
          </p>
        )}
      </div>

      {/* Preview Section */}
      {preview && (
        <div className='relative'>
          {showBrowserChrome && (
            <div className='bg-gray-200 dark:bg-gray-700 rounded-t-lg px-4 py-3 flex items-center space-x-2'>
              <div className='flex space-x-2'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
              </div>
              <div className='flex-1 text-center'>
                <div className='bg-white dark:bg-gray-600 rounded px-3 py-1 text-xs text-gray-600 dark:text-gray-300 inline-block'>
                  Preview
                </div>
              </div>
            </div>
          )}
          <div
            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 ${
              showBrowserChrome ? 'rounded-b-lg' : 'rounded-lg'
            }`}
          >
            {preview}
          </div>
        </div>
      )}

      {/* Code Section */}
      <div className='relative'>
        <div className='bg-gray-900 rounded-lg overflow-hidden'>
          {/* Code Header */}
          <div className='bg-gray-800 px-4 py-2 flex justify-between items-center'>
            <span className='text-gray-300 text-sm font-mono'>{language}</span>
            <button
              onClick={() => copyToClipboard(code, finalCopyKey)}
              className='flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm'
              aria-label={isCopied ? 'Copied!' : 'Copy code'}
            >
              {isCopied ? (
                <>
                  <CheckIcon className='h-4 w-4' />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardIcon className='h-4 w-4' />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Content */}
          <div className='p-4 overflow-x-auto'>
            <pre className='text-gray-100 text-sm leading-relaxed'>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExampleBlock;
