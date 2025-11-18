import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

// Social media share URL generators
const createShareUrl = {
  twitter: (url: string, text: string, hashtags: string[]) => {
    const hashtagStr = hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : '';
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}${hashtagStr}`;
  },
  facebook: (url: string) => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  },
  linkedin: (url: string, _title: string, _description: string) => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  },
  reddit: (url: string, title: string) => {
    return `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  },
  telegram: (url: string, text: string) => {
    return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  },
  whatsapp: (url: string, text: string) => {
    return `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
  },
  email: (url: string, title: string, description: string) => {
    return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`;
  }
};

const ShareDropdown: React.FC<{ shareConfig: ShareConfig }> = ({
  shareConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isPreparingShare, setIsPreparingShare] = useState(false);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

  // Prepare share URL when component mounts
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

  const hasNativeShare =
    typeof navigator !== 'undefined' && navigator.share !== undefined;

  const handleNativeShare = async () => {
    if (!hasNativeShare) return;

    try {
      await navigator.share({
        title: shareConfig.title,
        text: shareConfig.description,
        url: url,
      });
      setIsOpen(false);
    } catch (err) {
      // User cancelled or share failed
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Share failed:', err);
        // Fallback to dropdown on error
        setIsOpen(true);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopiedFeedback(true);
      setTimeout(() => {
        setShowCopiedFeedback(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      // Copy failed
    }
  };

  const handleShareClick = async () => {
    if (hasNativeShare) {
      // Use native share API directly
      await handleNativeShare();
    } else {
      // Show dropdown with social share options
      setIsOpen(!isOpen);
    }
  };

  const handleSocialShare = (platformUrl: string) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    setIsOpen(false);
  };

  // Define share platforms with icons
  const sharePlatforms = [
    {
      name: 'Twitter',
      url: createShareUrl.twitter(url, shareConfig.title, shareConfig.hashtags),
      color: 'text-blue-400',
      svg: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      )
    },
    {
      name: 'Facebook',
      url: createShareUrl.facebook(url),
      color: 'text-blue-600',
      svg: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      )
    },
    {
      name: 'LinkedIn',
      url: createShareUrl.linkedin(url, shareConfig.title, shareConfig.description),
      color: 'text-blue-700',
      svg: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      )
    },
    {
      name: 'Reddit',
      url: createShareUrl.reddit(url, shareConfig.title),
      color: 'text-orange-600',
      svg: (
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      )
    },
    {
      name: 'Telegram',
      url: createShareUrl.telegram(url, shareConfig.title),
      color: 'text-blue-500',
      svg: (
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      )
    },
    {
      name: 'WhatsApp',
      url: createShareUrl.whatsapp(url, shareConfig.title),
      color: 'text-green-600',
      svg: (
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      )
    }
  ];

  return (
    <div className='relative'>
      <button
        onClick={handleShareClick}
        disabled={isPreparingShare}
        className='flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        title='Share this page'
      >
        {isPreparingShare ? (
          <div className='w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin' />
        ) : (
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
        )}
      </button>

      {/* Dropdown for browsers without native share */}
      {isOpen && !hasNativeShare && (
        <>
          <div
            className='fixed inset-0 z-[999998]'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute right-0 top-10 z-[999999] w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1'>
            {sharePlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleSocialShare(platform.url)}
                className='w-full flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors'
              >
                <svg
                  className={`w-4 h-4 mr-2 ${platform.color}`}
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  {platform.svg}
                </svg>
                <span className='text-sm text-gray-700 dark:text-gray-300'>
                  {platform.name}
                </span>
              </button>
            ))}
            <div className='border-t border-gray-200 dark:border-gray-700 my-1' />
            <button
              onClick={copyToClipboard}
              className='w-full flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors'
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
                {showCopiedFeedback ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
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
