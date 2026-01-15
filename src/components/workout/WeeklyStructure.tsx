import { Link } from 'react-router-dom';
import type { WeeklyStructure as WeeklyStructureType } from '../../types/routine';

interface WeeklyStructureProps {
  weeklyStructure: WeeklyStructureType;
  routineId: string;
  currentWorkoutId?: string;
}

export function WeeklyStructure({ weeklyStructure, routineId, currentWorkoutId }: WeeklyStructureProps) {
  const { description, order_cycle, notes } = weeklyStructure;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
      <h3 className="font-semibold text-gray-900 mb-2">Weekly Structure</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Cycle Order</p>
        <div className="flex flex-wrap gap-2">
          {order_cycle.map((workoutId, index) => {
            const isActive = workoutId === currentWorkoutId;
            const displayName = workoutId.replace(/_/g, ' ');

            return (
              <Link
                key={`${workoutId}-${index}`}
                to={`/routine/${routineId}/workout/${encodeURIComponent(workoutId)}`}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {displayName}
              </Link>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-gray-500 italic">{notes}</p>
    </div>
  );
}
