// @ts-nocheck

import { expect, test } from "bun:test";
import { exercise } from "@/1. variables/variables-4";

test("Should return object with estimatedSalary and numberOfJobOffers", () => {
  const { estimatedSalary, numberOfJobOffers } = exercise();
  expect(estimatedSalary).toBe(1_000_000);
  expect(numberOfJobOffers).toBe(100);
});
