import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Workout } from '../../types/routine';

interface WorkoutCardProps {
  workoutId: string;
  workout: Workout;
  routineId: string;
}

export function WorkoutCard({ workoutId, workout, routineId }: WorkoutCardProps) {
  const navigate = useNavigate();
  const displayName = workoutId.replace(/_/g, ' ');

  return (
    <Card
      hoverable
      className="p-5"
      onClick={() => navigate(`/routine/${routineId}/workout/${encodeURIComponent(workoutId)}`)}
    >
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{displayName}</h3>
      <Badge variant="focus" className="mb-3">{workout.focus}</Badge>
      <p className="text-sm text-gray-500">{workout.exercises.length} exercises</p>
    </Card>
  );
}
