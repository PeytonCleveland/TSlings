import { expect, test } from "bun:test";
import { exercise } from "@/1. variables/variables-6";

test("Should return Hello, world!", () => {
  expect(exercise()).toBe("Hello, world!");
});
