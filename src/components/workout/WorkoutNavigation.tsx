import { Link } from 'react-router-dom';

interface WorkoutNavigationProps {
  routineId: string;
  workoutIds: string[];
  currentWorkoutId: string;
}

export function WorkoutNavigation({ routineId, workoutIds, currentWorkoutId }: WorkoutNavigationProps) {
  const currentIndex = workoutIds.indexOf(currentWorkoutId);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : workoutIds.length - 1;
  const nextIndex = currentIndex < workoutIds.length - 1 ? currentIndex + 1 : 0;

  const prevWorkout = workoutIds[prevIndex];
  const nextWorkout = workoutIds[nextIndex];

  const linkClasses =
    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors';

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-gray-200">
      <Link
        to={`/routine/${routineId}/workout/${encodeURIComponent(prevWorkout)}`}
        className={linkClasses}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {prevWorkout.replace(/_/g, ' ')}
      </Link>

      <Link
        to={`/routine/${routineId}/workout/${encodeURIComponent(nextWorkout)}`}
        className={linkClasses}
      >
        {nextWorkout.replace(/_/g, ' ')}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
