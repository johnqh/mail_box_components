import { useState, useEffect } from 'react';

interface UseCodeLoaderReturn {
  code: string;
  loading: boolean;
  error: string | null;
}

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
        console.error('Error loading code:', err);
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