import { expect, test } from "bun:test";
import { exercise } from "@/2. functions/functions-1";

test("Should return an emoji", () => {
  const possibleEmojis = ["🚀", "🌈", "🦄", "🔥", "🎉"];
  const emoji = exercise();

  expect(possibleEmojis).toContain(emoji);
});
