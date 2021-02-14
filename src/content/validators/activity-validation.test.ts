import { isContentBlock, isReadActivity } from "./activity-validation";

describe("isContentBlock", () => {
  describe("happy path", () => {
    const testCases = ["Hello world", "# Hello world\nThis is my markdown"];

    it("accepts a markdown string as a content block", () => {
      for (let string of testCases) {
        expect(isContentBlock(string)).toBe(true);
      }
    });

    it("accepts an object with a markdown string as a content block", () => {
      for (let markdown of testCases) {
        expect(isContentBlock({ markdown })).toBe(true);
      }
    });
  });

  describe("failing cases", () => {
    const testCases = [1234, true, undefined];

    it("does not accept non-strings", () => {
      for (let string of testCases) {
        expect(isContentBlock(string)).toBe(false);
      }
    });

    it("does not accept non-string values at the markdown key", () => {
      for (let markdown of testCases) {
        expect(isContentBlock({ markdown })).toBe(false);
      }
    });
  });
});

describe("isReadActivity", () => {
  describe("happy path", () => {
    it("permits an empty blocks array", () => {
      expect(
        isReadActivity({
          activityType: "read",
          blocks: [],
        })
      ).toBe(true);
    });
  });

  describe("sad path", () => {
    it("requires a blocks key to be present", () => {
      expect(
        isReadActivity({
          activityType: "read",
        })
      ).toBe(false);
    });

    it("requires a blocks key to be defined", () => {
      expect(
        isReadActivity({
          activityType: "read",
          blocks: undefined,
        })
      ).toBe(false);
    });

    it("catches type instead of activityType", () => {
      expect(
        isReadActivity({
          type: "read",
          blocks: [],
        })
      ).toBe(false);
    });
  });
});
