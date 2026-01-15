import { useState, useEffect } from 'react';
import type { RoutineWithId } from '../types/routine';
import { loadRoutine } from '../data/routineLoader';

interface UseRoutineResult {
  routine: RoutineWithId | null;
  isLoading: boolean;
  error: string | null;
}

export function useRoutine(routineId: string | undefined): UseRoutineResult {
  const [routine, setRoutine] = useState<RoutineWithId | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!routineId) {
      setError('No routine ID provided');
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchRoutine(id: string) {
      try {
        setIsLoading(true);
        setError(null);
        const data = await loadRoutine(id);
        if (!cancelled) {
          setRoutine({ id, ...data });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load routine');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchRoutine(routineId);

    return () => {
      cancelled = true;
    };
  }, [routineId]);

  return { routine, isLoading, error };
}
