// @ts-nocheck

import { expect, test } from "bun:test";
import { exercise } from "@/1. variables/variables-3";

test("Should return Goodbye, world!", () => {
  expect(exercise()).toBe("Goodbye, world!");
});
