import {
  formatFileSize,
  convertFileSize,
  parseFileSize,
} from '../utils/formatFileSize';

describe('formatFileSize', () => {
  it('returns "0 Bytes" for 0', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('formats bytes correctly', () => {
    expect(formatFileSize(1)).toBe('1 Bytes');
    expect(formatFileSize(512)).toBe('512 Bytes');
    expect(formatFileSize(1023)).toBe('1023 Bytes');
  });

  it('formats kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(10240)).toBe('10 KB');
  });

  it('formats megabytes correctly', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(1572864)).toBe('1.5 MB');
    expect(formatFileSize(5242880)).toBe('5 MB');
  });

  it('formats gigabytes correctly', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
    expect(formatFileSize(1610612736)).toBe('1.5 GB');
  });

  it('formats terabytes correctly', () => {
    expect(formatFileSize(1099511627776)).toBe('1 TB');
  });

  it('removes trailing zeros from decimal places', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
  });

  it('rounds to 2 decimal places', () => {
    // 1024 + 1024/3 = 1365.33... bytes = ~1.33 KB
    expect(formatFileSize(1365)).toBe('1.33 KB');
  });
});

describe('convertFileSize', () => {
  it('converts between same units', () => {
    expect(convertFileSize(1, 'mb', 'mb')).toBe(1);
    expect(convertFileSize(5, 'kb', 'kb')).toBe(5);
  });

  it('converts MB to KB', () => {
    expect(convertFileSize(1, 'mb', 'kb')).toBe(1024);
  });

  it('converts KB to MB', () => {
    expect(convertFileSize(1024, 'kb', 'mb')).toBe(1);
  });

  it('converts bytes to KB', () => {
    expect(convertFileSize(2048, 'bytes', 'kb')).toBe(2);
  });

  it('converts GB to MB', () => {
    expect(convertFileSize(1, 'gb', 'mb')).toBe(1024);
  });

  it('converts TB to GB', () => {
    expect(convertFileSize(1, 'tb', 'gb')).toBe(1024);
  });

  it('rounds to 2 decimal places', () => {
    expect(convertFileSize(1, 'kb', 'bytes')).toBe(1024);
    expect(convertFileSize(1000, 'bytes', 'kb')).toBe(0.98);
  });

  it('handles zero', () => {
    expect(convertFileSize(0, 'mb', 'kb')).toBe(0);
  });
});

describe('parseFileSize', () => {
  it('parses bytes', () => {
    expect(parseFileSize('100 Bytes')).toBe(100);
    expect(parseFileSize('1 byte')).toBe(1);
  });

  it('parses KB', () => {
    expect(parseFileSize('1 KB')).toBe(1024);
    expect(parseFileSize('1.5 KB')).toBe(1536);
  });

  it('parses MB', () => {
    expect(parseFileSize('1 MB')).toBe(1048576);
    expect(parseFileSize('2 MB')).toBe(2097152);
  });

  it('parses GB', () => {
    expect(parseFileSize('1 GB')).toBe(1073741824);
  });

  it('parses TB', () => {
    expect(parseFileSize('1 TB')).toBe(1099511627776);
  });

  it('is case insensitive', () => {
    expect(parseFileSize('1 kb')).toBe(1024);
    expect(parseFileSize('1 Kb')).toBe(1024);
    expect(parseFileSize('1 MB')).toBe(1048576);
    expect(parseFileSize('1 mb')).toBe(1048576);
  });

  it('returns null for invalid input', () => {
    expect(parseFileSize('invalid')).toBeNull();
    expect(parseFileSize('')).toBeNull();
    expect(parseFileSize('abc KB')).toBeNull();
    expect(parseFileSize('1 XB')).toBeNull();
  });

  it('handles decimal values', () => {
    expect(parseFileSize('1.5 KB')).toBe(1536);
    expect(parseFileSize('2.5 MB')).toBe(2621440);
  });

  it('handles values without space between number and unit', () => {
    // The regex uses \s* so space is optional
    expect(parseFileSize('1KB')).toBe(1024);
    expect(parseFileSize('2MB')).toBe(2097152);
  });
});
