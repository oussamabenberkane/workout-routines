import type { Exercise } from '../../types/routine';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const { name, sets, reps, intensity, tempo, duration, rest } = exercise;

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 mb-2">{name}</h4>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="font-semibold">{sets} sets</span>
            <span className="text-gray-400">×</span>
            <span className="font-semibold">{duration || reps}</span>
          </div>

          {(intensity || tempo || rest) && (
            <div className="flex flex-wrap gap-2">
              {intensity && <Badge variant="intensity">{intensity}</Badge>}
              {tempo && <Badge variant="tempo">{tempo}</Badge>}
              {rest && <Badge variant="rest">Rest: {rest}</Badge>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
