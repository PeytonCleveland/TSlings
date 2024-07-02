// @ts-nocheck

import { expect, test } from "bun:test";
import { exercise } from "@/1. variables/variables-2";

test("Should return 43", () => {
  expect(exercise()).toBe(43);
});
