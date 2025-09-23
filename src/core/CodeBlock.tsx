import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useCodeLoader } from '../hooks/useCodeLoader';

interface CodeBlockProps {
  filename?: string;
  code?: string;
  language?: string;
  title?: string;
  className?: string;
  showCopy?: boolean;
  showHeader?: boolean;
}

/**
 * CodeBlock - A versatile code display component with syntax highlighting and copy functionality
 *
 * Can work in two modes:
 * 1. File loading mode: Pass `filename` to load code from `/code/${filename}`
 * 2. Direct code mode: Pass `code` and optionally `language` directly
 *
 * Features:
 * - Syntax highlighting support for multiple languages
 * - Copy to clipboard functionality
 * - Loading and error states (for file mode)
 * - Customizable styling and behavior
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  filename,
  code: directCode,
  language: directLanguage,
  title,
  className = '',
  showCopy = true,
  showHeader = true,
}) => {
  const { t } = useTranslation('codeBlock');
  const { code: loadedCode, loading, error } = useCodeLoader(filename || '');
  const [copied, setCopied] = useState(false);

  // Use direct code if provided, otherwise use loaded code
  const code = directCode || loadedCode;

  // Determine file extension for syntax highlighting class
  const getLanguageFromFilename = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'sol':
        return 'solidity';
      case 'js':
      case 'mjs':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'sh':
        return 'bash';
      case 'graphql':
        return 'graphql';
      case 'json':
        return 'json';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'jsx':
        return 'jsx';
      case 'tsx':
        return 'tsx';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
      case 'c':
        return 'cpp';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      case 'php':
        return 'php';
      case 'rb':
        return 'ruby';
      default:
        return 'text';
    }
  };

  // Determine language for syntax highlighting
  const language =
    directLanguage || (filename ? getLanguageFromFilename(filename) : 'text');

  const handleCopy = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  // Loading state (only for file loading mode)
  if (filename && loading) {
    return (
      <div
        className={`bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm ${className}`}
      >
        <div className='animate-pulse text-gray-500'>
          {t('loadingCode', 'Loading code...')}
        </div>
      </div>
    );
  }

  // Error state (only for file loading mode)
  if (filename && error) {
    return (
      <div
        className={`bg-gray-900 text-red-400 rounded-lg p-4 font-mono text-sm ${className}`}
      >
        {t('error', 'Error')}: {error}
      </div>
    );
  }

  // No code to display
  if (!code) {
    return (
      <div
        className={`bg-gray-900 text-gray-400 rounded-lg p-4 font-mono text-sm ${className}`}
      >
        {t('noCode', 'No code to display')}
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-900 rounded-lg border border-green-500/20 shadow-lg shadow-green-500/10 ${className}`}
    >
      {/* Header with filename/title and copy button */}
      {showHeader && (
        <div className='flex items-center justify-between px-4 py-2 border-b border-green-500/20 bg-gray-800/50'>
          <span className='text-sm text-green-400 font-mono'>
            {title || filename || `${language} code`}
          </span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className='p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-all duration-200 group'
              title={t('copyCode', 'Copy code')}
            >
              {copied ? (
                <CheckIcon className='h-4 w-4 text-green-400' />
              ) : (
                <ClipboardDocumentIcon className='h-4 w-4 group-hover:scale-110 transition-transform' />
              )}
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <div className='p-4 overflow-x-auto'>
        <pre className={`text-sm language-${language}`}>
          <code className='text-gray-100'>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
