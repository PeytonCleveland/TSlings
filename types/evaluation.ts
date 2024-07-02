export enum FailureReason {
  "INCOMPLETE",
  "TEST_FAILURE",
  "COMPILE_FAILURE",
}

export interface Failure {
  code: FailureReason;
  text: string;
}

export class IncompleteFailure implements Failure {
  code = FailureReason.INCOMPLETE;
  text = "User has not completed this exercise.";
}

export class CompileFailure implements Failure {
  code = FailureReason.COMPILE_FAILURE;
  constructor(public text: string) {
    this.text = text;
  }
}

export class TestFailure implements Failure {
  code = FailureReason.TEST_FAILURE;
  constructor(public text: string) {
    this.text = text;
  }
}

export interface IEvaluation {
  passing: boolean;
  error?: Failure;
}

export class Evaluation implements IEvaluation {
  passing: boolean;
  error?: Failure;
  constructor(passing: boolean, error?: Failure) {
    this.passing = passing;
    this.error = error;
  }
}
