import { useNavigate } from 'react-router-dom';
import { useRoutines } from '../hooks/useRoutines';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function HomePage() {
  const { routines, isLoading, error } = useRoutines();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-2">Failed to load routines</p>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (routines.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No routines found</p>
        <p className="text-gray-400 text-sm mt-2">
          Add JSON files to the routines folder to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Routines</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routines.map((routine) => (
          <Card
            key={routine.id}
            hoverable
            className="p-5"
            onClick={() => navigate(`/routine/${routine.id}`)}
          >
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              {routine.program_name}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {routine.weekly_structure.description}
            </p>
            <p className="text-sm text-gray-500">
              {Object.keys(routine.workouts).length} workouts
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
