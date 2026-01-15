import { useParams, Link } from 'react-router-dom';
import { useRoutine } from '../hooks/useRoutine';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Badge } from '../components/ui/Badge';
import { ExerciseList } from '../components/workout/ExerciseList';
import { WorkoutNavigation } from '../components/workout/WorkoutNavigation';

export function WorkoutPage() {
  const { routineId, workoutId } = useParams<{ routineId: string; workoutId: string }>();
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

  const decodedWorkoutId = workoutId ? decodeURIComponent(workoutId) : '';
  const workout = routine.workouts[decodedWorkoutId];

  if (!workout) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-2">Workout not found</p>
        <Link
          to={`/routine/${routineId}`}
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to routine
        </Link>
      </div>
    );
  }

  const workoutIds = Object.keys(routine.workouts);
  const displayName = decodedWorkoutId.replace(/_/g, ' ');

  return (
    <div>
      <Link
        to={`/routine/${routineId}`}
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {routine.program_name}
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{displayName}</h1>
        <Badge variant="focus" className="text-sm">{workout.focus}</Badge>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">{workout.exercises.length} exercises</p>
      </div>

      <ExerciseList exercises={workout.exercises} />

      <WorkoutNavigation
        routineId={routine.id}
        workoutIds={workoutIds}
        currentWorkoutId={decodedWorkoutId}
      />
    </div>
  );
}
