import { useParams, Link } from 'react-router-dom';
import { useRoutine } from '../hooks/useRoutine';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { WeeklyStructure } from '../components/workout/WeeklyStructure';
import { WorkoutCard } from '../components/workout/WorkoutCard';

export function RoutinePage() {
  const { routineId } = useParams<{ routineId: string }>();
  const { routine, isLoading, error } = useRoutine(routineId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !routine) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-2">Failed to load routine</p>
        <p className="text-gray-500 text-sm">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to routines
        </Link>
      </div>
    );
  }

  const workoutEntries = Object.entries(routine.workouts);

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Routines
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{routine.program_name}</h1>
      <p className="text-gray-600 mb-6">{routine.weekly_structure.description}</p>

      <WeeklyStructure weeklyStructure={routine.weekly_structure} routineId={routine.id} />

      <h2 className="font-semibold text-lg text-gray-900 mb-4">Workouts</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {workoutEntries.map(([workoutId, workout]) => (
          <WorkoutCard
            key={workoutId}
            workoutId={workoutId}
            workout={workout}
            routineId={routine.id}
          />
        ))}
      </div>
    </div>
  );
}
