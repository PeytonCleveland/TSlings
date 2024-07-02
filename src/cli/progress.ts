const PROGRESS_FILE_PATH = ".user_progress.json";
import { Progress } from "../../types/progress";
import type { Exercise } from "../../types/progress";

export const loadProgress = async (): Promise<Progress> => {
  const progressFile = Bun.file(PROGRESS_FILE_PATH, {
    type: "application/json",
  });

  const exists = await progressFile.exists();

  if (!exists) {
    const progress = new Progress(
      [],
      { name: "variables-1", category: "variables" },
      [
        { name: "variables-2", category: "variables" },
        { name: "variables-3", category: "variables" },
        { name: "variables-4", category: "variables" },
        { name: "variables-5", category: "variables" },
        { name: "variables-6", category: "variables" },
      ]
    );

    await Bun.write(PROGRESS_FILE_PATH, JSON.stringify(progress));
    return progress;
  }

  return await JSON.parse(await progressFile.text());
};

export const markCompleteAndLoadNext = async (exercise: Exercise) => {
  const progress = await loadProgress();
  progress.completed.push(exercise);
  progress.current = progress.incomplete.shift()!;
  await Bun.write(PROGRESS_FILE_PATH, JSON.stringify(progress));
};
