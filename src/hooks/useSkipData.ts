
import { useState, useEffect } from 'react';
import { SkipData } from '../types/skip';

export const useSkipData = (apiUrl?: string) => {
  const [skipData, setSkipData] = useState<SkipData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiUrl) return;

    const fetchSkipData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SkipData[] = await response.json();
        setSkipData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skip data');
        console.error('Error fetching skip data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkipData();
  }, [apiUrl]);

  return { skipData, loading, error };
};
