import type { Routine, RoutineWithId } from '../types/routine';

const ROUTINES_BASE_PATH = '/routines';

export async function getRoutineManifest(): Promise<string[]> {
  const response = await fetch(`${ROUTINES_BASE_PATH}/index.json`);
  if (!response.ok) {
    throw new Error('Failed to load routine manifest');
  }
  return response.json();
}

export async function loadRoutine(routineId: string): Promise<Routine> {
  const response = await fetch(`${ROUTINES_BASE_PATH}/${routineId}.json`);
  if (!response.ok) {
    throw new Error(`Routine not found: ${routineId}`);
  }
  return response.json();
}

export async function loadAllRoutines(): Promise<RoutineWithId[]> {
  const manifest = await getRoutineManifest();
  const routines = await Promise.all(
    manifest.map(async (id) => ({
      id,
      ...(await loadRoutine(id)),
    }))
  );
  return routines;
}
