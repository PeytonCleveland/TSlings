import { expect, test } from "bun:test";
import { exercise } from "@/2. functions/functions-4";

test("Should return 25", () => {
  expect(exercise()).toBe(25);
});
