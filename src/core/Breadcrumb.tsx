import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton
} from 'react-share';
import { BreadcrumbItem } from '../utils/navigationHelpers';

interface ShareConfig {
  title: string;
  description: string;
  hashtags: string[];
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  shareConfig?: ShareConfig;
  className?: string;
  showHome?: boolean;
}

const ShareDropdown: React.FC<{ shareConfig: ShareConfig }> = ({ shareConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareButtons = [
    {
      component: TwitterShareButton,
      props: { url, title: shareConfig.title, hashtags: shareConfig.hashtags },
      label: 'Twitter',
      color: '#1DA1F2'
    },
    {
      component: FacebookShareButton,
      props: { url, quote: `${shareConfig.title}\n\n${shareConfig.description}` },
      label: 'Facebook',
      color: '#4267B2'
    },
    {
      component: LinkedinShareButton,
      props: { url, title: shareConfig.title, summary: shareConfig.description },
      label: 'LinkedIn',
      color: '#0077B5'
    },
    {
      component: RedditShareButton,
      props: { url, title: shareConfig.title },
      label: 'Reddit',
      color: '#FF4500'
    },
    {
      component: TelegramShareButton,
      props: { url, title: shareConfig.title },
      label: 'Telegram',
      color: '#0088CC'
    },
    {
      component: WhatsappShareButton,
      props: { url, title: shareConfig.title, separator: '\n\n' },
      label: 'WhatsApp',
      color: '#25D366'
    }
  ];

  const copyToClipboard = async () => {
    const shareText = `${shareConfig.title}\n\n${shareConfig.description}\n\n${shareConfig.hashtags.map(tag => `#${tag}`).join(' ')}\n\n${url}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
        title="Share this page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[999998]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-10 z-[999999] w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1">
            {shareButtons.map((button, index) => {
              const ShareComponent = button.component;
              return (
                <ShareComponent key={index} {...button.props} className="w-full">
                  <div className="flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div 
                      className="w-3 h-3 rounded mr-2"
                      style={{ backgroundColor: button.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{button.label}</span>
                  </div>
                </ShareComponent>
              );
            })}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="w-3 h-3 rounded mr-2 bg-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Copy Link</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, shareConfig, className: _className, showHome: _showHome }) => {
  return (
    <div className="flex items-center justify-between">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center text-sm space-x-2">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                {item.current ? (
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
                ) : (
                  <Link 
                    to={item.href || '#'} 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
              {index < items.length - 1 && (
                <li>
                  <span className="text-gray-400 dark:text-gray-500">/</span>
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
      {shareConfig && <ShareDropdown shareConfig={shareConfig} />}
    </div>
  );
};

export { Breadcrumb, type BreadcrumbProps };