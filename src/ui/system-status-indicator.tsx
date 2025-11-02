import React, { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { cn } from '../lib/utils';

export type SystemStatus = 'operational' | 'degraded' | 'major-outage';

export interface SystemStatusData {
  status: SystemStatus;
  version?: string;
  message?: string;
  incidents?: string[];
}

export interface SystemStatusIndicatorProps {
  statusPageUrl?: string;
  apiEndpoint?: string;
  refreshInterval?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  version?: string;
  onStatusChange?: (status: SystemStatusData) => void;
}

const statusConfig = {
  operational: {
    color: 'bg-green-500/80',
    hoverColor: 'hover:bg-green-500',
    label: 'All systems operational',
  },
  degraded: {
    color: 'bg-yellow-500/80',
    hoverColor: 'hover:bg-yellow-500',
    label: 'Degraded performance',
  },
  'major-outage': {
    color: 'bg-red-500/80',
    hoverColor: 'hover:bg-red-500',
    label: 'Major outage',
  },
};

const sizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export const SystemStatusIndicator: React.FC<SystemStatusIndicatorProps> = ({
  statusPageUrl = '/status',
  apiEndpoint,
  refreshInterval = 60000, // 1 minute default
  size = 'sm',
  className,
  version,
  onStatusChange,
}) => {
  const [statusData, setStatusData] = useState<SystemStatusData>({
    status: 'operational',
    version: version || '1.0.0',
    message: 'All systems operational',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!apiEndpoint) return;

      setIsLoading(true);
      try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
          const data = await response.json();

          // Transform StatusPage.io format if needed
          let transformedData: SystemStatusData;
          if (data.status?.indicator) {
            // StatusPage.io format
            const indicatorMap: Record<string, SystemStatus> = {
              none: 'operational',
              minor: 'degraded',
              major: 'major-outage',
              critical: 'major-outage',
            };
            transformedData = {
              status: indicatorMap[data.status.indicator] || 'operational',
              version: version,
              message: data.status.description,
            };
          } else {
            // Native format
            transformedData = data;
          }

          setStatusData(transformedData);
          onStatusChange?.(transformedData);
        }
      } catch {
        // Status fetch failed
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchStatus();

    // Set up polling if refreshInterval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchStatus, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [apiEndpoint, refreshInterval, onStatusChange, version]);

  const config = statusConfig[statusData.status];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(statusPageUrl, '_blank', 'noopener,noreferrer');
  };

  const tooltipContent = (
    <div className='text-xs'>
      {statusData.version && (
        <div className='font-semibold mb-1'>Version {statusData.version}</div>
      )}
      <div>{statusData.message || config.label}</div>
      {statusData.incidents && statusData.incidents.length > 0 && (
        <div className='mt-2 text-[10px] opacity-90'>
          <div className='font-medium'>Current incidents:</div>
          <ul className='list-disc list-inside'>
            {statusData.incidents.map((incident, idx) => (
              <li key={idx}>{incident}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleClick}
            className={cn(
              'rounded-full flex-shrink-0 transition-all duration-200 cursor-pointer',
              'ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2',
              config.color,
              config.hoverColor,
              sizeClasses[size],
              isLoading && 'animate-pulse',
              className
            )}
            aria-label={`System status: ${config.label}`}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className='z-50 overflow-hidden rounded-md bg-gray-900 dark:bg-gray-800 px-3 py-2 text-white shadow-md animate-in fade-in-0 zoom-in-95'
            sideOffset={5}
          >
            {tooltipContent}
            <Tooltip.Arrow className='fill-gray-900 dark:fill-gray-800' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default SystemStatusIndicator;
