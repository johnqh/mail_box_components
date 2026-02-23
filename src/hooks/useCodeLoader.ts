import { useState, useEffect } from 'react';

/** Return type for the useCodeLoader hook. */
interface UseCodeLoaderReturn {
  /** The loaded code content, or an error placeholder string. */
  code: string;
  /** Whether the code file is currently being fetched. */
  loading: boolean;
  /** Error message if the fetch failed, or null on success. */
  error: string | null;
}

/**
 * Hook that fetches a code file from the `/code/` endpoint.
 *
 * Loads a code file by filename, managing loading and error states.
 * The file is fetched from `/code/{filename}` and returned as a string.
 *
 * @param filename - The name of the code file to fetch
 * @returns An object containing the code content, loading state, and any error
 */
export const useCodeLoader = (filename: string): UseCodeLoaderReturn => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCode = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/code/${filename}`);

        if (!response.ok) {
          throw new Error(`Failed to load code file: ${filename}`);
        }

        const codeContent = await response.text();
        setCode(codeContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCode('// Error loading code file');
      } finally {
        setLoading(false);
      }
    };

    if (filename) {
      loadCode();
    }
  }, [filename]);

  return { code, loading, error };
};
