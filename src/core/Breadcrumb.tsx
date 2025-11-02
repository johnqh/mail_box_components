import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share';
import { BreadcrumbItem } from '../utils/navigationHelpers';

interface ShareConfig {
  title: string;
  description: string;
  hashtags: string[];
  onBeforeShare?: (baseUrl: string) => Promise<string>;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  shareConfig?: ShareConfig;
  className?: string;
  showHome?: boolean;
}

const ShareDropdown: React.FC<{ shareConfig: ShareConfig }> = ({
  shareConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isPreparingShare, setIsPreparingShare] = useState(false);

  // Prepare share URL when component mounts (not when dropdown opens)
  React.useEffect(() => {
    const onBeforeShare = shareConfig.onBeforeShare;
    if (onBeforeShare && !shareUrl) {
      const prepareUrl = async () => {
        setIsPreparingShare(true);
        try {
          const baseUrl =
            typeof window !== 'undefined' ? window.location.href : '';
          const modifiedUrl = await onBeforeShare(baseUrl);
          setShareUrl(modifiedUrl);
        } catch {
          // Fallback to base URL on error
          const baseUrl =
            typeof window !== 'undefined' ? window.location.href : '';
          setShareUrl(baseUrl);
        } finally {
          setIsPreparingShare(false);
        }
      };
      prepareUrl();
    }
  }, [shareConfig, shareUrl]);

  const url =
    shareUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const shareButtons = [
    {
      component: TwitterShareButton,
      icon: TwitterIcon,
      props: { url, title: shareConfig.title, hashtags: shareConfig.hashtags },
      label: 'Twitter',
    },
    {
      component: FacebookShareButton,
      icon: FacebookIcon,
      props: {
        url,
        quote: `${shareConfig.title}\n\n${shareConfig.description}`,
      },
      label: 'Facebook',
    },
    {
      component: LinkedinShareButton,
      icon: LinkedinIcon,
      props: {
        url,
        title: shareConfig.title,
        summary: shareConfig.description,
      },
      label: 'LinkedIn',
    },
    {
      component: RedditShareButton,
      icon: RedditIcon,
      props: { url, title: shareConfig.title },
      label: 'Reddit',
    },
    {
      component: TelegramShareButton,
      icon: TelegramIcon,
      props: { url, title: shareConfig.title },
      label: 'Telegram',
    },
    {
      component: WhatsappShareButton,
      icon: WhatsappIcon,
      props: { url, title: shareConfig.title, separator: '\n\n' },
      label: 'WhatsApp',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsOpen(false);
    } catch {
      // Copy failed
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition-colors'
        title='Share this page'
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-[999998]'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute right-0 top-10 z-[999999] w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1'>
            {isPreparingShare ? (
              <div className='flex items-center justify-center px-3 py-2'>
                <div className='w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin' />
              </div>
            ) : (
              <>
                {shareButtons.map((button, index) => {
                  const ShareComponent = button.component;
                  const IconComponent = button.icon;

                  return (
                    <ShareComponent
                      key={index}
                      {...button.props}
                      className='w-full'
                    >
                      <div className='flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'>
                        <IconComponent size={16} round className='mr-2' />
                        <span className='text-sm text-gray-700 dark:text-gray-300'>
                          {button.label}
                        </span>
                      </div>
                    </ShareComponent>
                  );
                })}
                <button
                  onClick={copyToClipboard}
                  className='w-full flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                >
                  <svg
                    className='w-4 h-4 mr-2 text-gray-600 dark:text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                    />
                  </svg>
                  <span className='text-sm text-gray-700 dark:text-gray-300'>
                    Copy Link
                  </span>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  shareConfig,
  className: _className,
  showHome: _showHome,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <nav aria-label='Breadcrumb'>
        <ol className='flex items-center text-sm space-x-2'>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                {item.current ? (
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href || '#'}
                    className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors'
                  >
                    {item.label}
                  </Link>
                )}
              </li>
              {index < items.length - 1 && (
                <li>
                  <span className='text-gray-400 dark:text-gray-500'>/</span>
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
