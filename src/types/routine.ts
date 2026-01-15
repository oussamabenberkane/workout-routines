export interface Exercise {
  name: string;
  sets: number | string;
  reps: number | string;
  rest?: string;
  intensity?: string;
  tempo?: string;
  duration?: string;
}

export interface Workout {
  focus: string;
  exercises: Exercise[];
}

export interface WeeklyStructure {
  description: string;
  order_cycle: string[];
  notes: string;
}

export interface Routine {
  program_name: string;
  weekly_structure: WeeklyStructure;
  workouts: Record<string, Workout>;
}

export interface RoutineWithId extends Routine {
  id: string;
}
