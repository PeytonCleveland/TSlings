import { $ } from "bun";

const dir = import.meta.dir.split("/src/cli")[0];
import type { IEvaluation } from "../../types/evaluation";
import {
  IncompleteFailure,
  CompileFailure,
  TestFailure,
  Evaluation,
} from "../../types/evaluation";

export const evaluateFile = async (filePath: string): Promise<IEvaluation> => {
  if (await isInProgress(filePath))
    return new Evaluation(false, new IncompleteFailure());

  // User marked complete, compile and test file
  const fileDir = filePath.split("/")[1];
  const fileName = filePath.split("/")[filePath.split("/").length - 1];

  try {
    await $`tsc --noEmit --skipLibCheck ${dir}/exercises/${fileDir}/${fileName}`;
  } catch (error: any) {
    return new Evaluation(
      false,
      new CompileFailure(error.info.stdout.toString())
    );
  }

  try {
    await $`bun test ${dir}/src/__exerciseTests__/${fileDir}/${getTestName(
      fileName
    )}`;
  } catch (error: any) {
    return new Evaluation(false, new TestFailure(error.stderr.toString()));
  }

  return { passing: true };
};

const isInProgress = async (filePath: string) => {
  const file = Bun.file(`${dir}/${filePath}`);
  const contents = await file.text();
  return contents.includes("// I AM NOT DONE");
};

const getTestName = (fileName: string) => {
  return `${fileName.split(".")[0]}.test.${fileName.split(".")[1]}`;
};
