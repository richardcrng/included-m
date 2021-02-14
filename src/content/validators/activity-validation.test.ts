import { isContentBlock } from "./activity-validation";

describe("isContentBlock", () => {
  const testStrings = ["Hello world", "# Hello world\nThis is my markdown"];

  it("accepts a markdown string as a content block", () => {
    for (let string of testStrings) {
      expect(isContentBlock(string)).toBe(true);
    }
  });

  it("accepts an object with a markdown string as a content block", () => {
    for (let markdown of testStrings) {
      expect(isContentBlock({ markdown })).toBe(true);
    }
  });
});
