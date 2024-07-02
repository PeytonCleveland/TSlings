export interface Exercise {
  name: string;
  category: string;
}

export class Progress {
  completed: Exercise[];
  current: Exercise;
  incomplete: Exercise[];

  constructor(
    completed: Exercise[],
    current: Exercise,
    incomplete: Exercise[]
  ) {
    this.completed = completed;
    this.current = current;
    this.incomplete = incomplete;
  }
}
