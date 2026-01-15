import { useState, useEffect } from 'react';
import type { RoutineWithId } from '../types/routine';
import { loadAllRoutines } from '../data/routineLoader';

interface UseRoutinesResult {
  routines: RoutineWithId[];
  isLoading: boolean;
  error: string | null;
}

export function useRoutines(): UseRoutinesResult {
  const [routines, setRoutines] = useState<RoutineWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRoutines() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await loadAllRoutines();
        if (!cancelled) {
          setRoutines(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load routines');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchRoutines();

    return () => {
      cancelled = true;
    };
  }, []);

  return { routines, isLoading, error };
}
