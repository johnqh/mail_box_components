import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

export interface QRCodeDisplayProps {
  /** Data to encode */
  value: string;
  /** QR code size */
  size?: number;
  /** Foreground color */
  fgColor?: string;
  /** Background color */
  bgColor?: string;
  /** Error correction level */
  level?: 'L' | 'M' | 'Q' | 'H';
  /** Show download button */
  showDownload?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * QRCodeDisplay Component
 *
 * QR code generator and display component.
 * Uses canvas to render QR codes with customizable colors.
 *
 * Note: This is a placeholder that renders a simple grid pattern.
 * For production use, integrate with a QR code library like 'qrcode' or 'qrcode.react'.
 *
 * @example
 * ```tsx
 * <QRCodeDisplay
 *   value="https://example.com"
 *   size={200}
 *   showDownload
 * />
 * ```
 *
 * @example
 * ```tsx
 * <QRCodeDisplay
 *   value={walletAddress}
 *   fgColor="#000000"
 *   bgColor="#ffffff"
 * />
 * ```
 */
export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  fgColor = '#000000',
  bgColor = '#ffffff',
  showDownload = false,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Draw placeholder pattern (simplified QR-like grid)
    // In production, use a real QR code library
    ctx.fillStyle = fgColor;
    const gridSize = 8;
    const cellSize = size / gridSize;

    // Create a simple pattern based on value hash
    const hash = value
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const shouldFill = (hash + row * gridSize + col) % 3 !== 0;
        if (shouldFill) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    // Draw corner squares (position markers)
    const markerSize = cellSize * 3;
    [
      [0, 0],
      [size - markerSize, 0],
      [0, size - markerSize],
    ].forEach(([x, y]) => {
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = cellSize;
      ctx.strokeRect(
        x + cellSize / 2,
        y + cellSize / 2,
        markerSize - cellSize,
        markerSize - cellSize
      );
    });
  }, [value, size, fgColor, bgColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = url;
    link.click();
  };

  return (
    <div className={cn('inline-flex flex-col items-center gap-3', className)}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className='border-2 border-gray-200 dark:border-gray-700 rounded-lg'
      />

      {showDownload && (
        <button
          onClick={handleDownload}
          className={cn(
            'px-4 py-2 text-sm font-medium',
            'bg-blue-600 dark:bg-blue-500 text-white',
            'rounded-md',
            'hover:bg-blue-700 dark:hover:bg-blue-600',
            'transition-colors'
          )}
        >
          Download QR Code
        </button>
      )}

      <p className='text-xs text-gray-600 dark:text-gray-400 max-w-[200px] text-center break-all'>
        {value}
      </p>
    </div>
  );
};
