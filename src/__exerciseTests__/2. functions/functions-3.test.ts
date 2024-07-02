import { expect, test } from "bun:test";
import { exercise } from "@/2. functions/functions-3";

test("Should return 6", () => {
  expect(exercise()).toBe(6);
});
