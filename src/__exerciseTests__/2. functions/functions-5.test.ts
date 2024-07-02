import { expect, test } from "bun:test";
import { exercise } from "@/2. functions/functions-5";

test("Should return false", () => {
  expect(exercise()).toBe(false);
});
