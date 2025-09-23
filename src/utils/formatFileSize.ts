/**
 * Format a file size in bytes to a human-readable string
 *
 * Converts bytes to the appropriate unit (Bytes, KB, MB, GB)
 * with proper rounding to 2 decimal places.
 *
 * @param bytes - The file size in bytes
 * @returns Formatted string with appropriate unit
 *
 * @example
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1536) // "1.5 KB"
 * formatFileSize(1048576) // "1 MB"
 * formatFileSize(0) // "0 Bytes"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Ensure we don't exceed the available size units
  const sizeIndex = Math.min(i, sizes.length - 1);

  return (
    parseFloat((bytes / Math.pow(k, sizeIndex)).toFixed(2)) +
    ' ' +
    sizes[sizeIndex]
  );
};

/**
 * Convert file size from one unit to another
 *
 * @param value - The numeric value to convert
 * @param fromUnit - Source unit (bytes, kb, mb, gb, tb)
 * @param toUnit - Target unit (bytes, kb, mb, gb, tb)
 * @returns Converted value
 *
 * @example
 * convertFileSize(1, "mb", "kb") // 1024
 * convertFileSize(1024, "kb", "mb") // 1
 */
export const convertFileSize = (
  value: number,
  fromUnit: 'bytes' | 'kb' | 'mb' | 'gb' | 'tb',
  toUnit: 'bytes' | 'kb' | 'mb' | 'gb' | 'tb'
): number => {
  const units = { bytes: 0, kb: 1, mb: 2, gb: 3, tb: 4 };
  const k = 1024;

  const fromBytes = value * Math.pow(k, units[fromUnit]);
  const result = fromBytes / Math.pow(k, units[toUnit]);

  return Math.round(result * 100) / 100; // Round to 2 decimal places
};

/**
 * Parse a human-readable file size string back to bytes
 *
 * @param sizeString - String like "1.5 KB", "2 MB", etc.
 * @returns Size in bytes, or null if parsing fails
 *
 * @example
 * parseFileSize("1.5 KB") // 1536
 * parseFileSize("2 MB") // 2097152
 * parseFileSize("invalid") // null
 */
export const parseFileSize = (sizeString: string): number | null => {
  const match = sizeString.match(/^(\d+(?:\.\d+)?)\s*(bytes?|kb|mb|gb|tb)$/i);

  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  const multipliers: Record<string, number> = {
    bytes: 1,
    byte: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
  };

  const multiplier = multipliers[unit];
  return multiplier ? Math.round(value * multiplier) : null;
};
