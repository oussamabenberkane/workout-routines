import type { Exercise } from '../../types/routine';
import { ExerciseCard } from './ExerciseCard';

interface ExerciseListProps {
  exercises: Exercise[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div className="grid gap-3">
      {exercises.map((exercise, index) => (
        <ExerciseCard key={exercise.name} exercise={exercise} index={index} />
      ))}
    </div>
  );
}
