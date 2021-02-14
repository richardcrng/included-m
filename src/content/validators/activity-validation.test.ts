import {
  isContentBlock,
  isReadActivity,
  isSelectAnAnswerActivity,
} from "./activity-validation";

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

    it("permits a string blocks array", () => {
      expect(
        isReadActivity({
          activityType: "read",
          blocks: ["hello", "world"],
        })
      ).toBe(true);
    });

    it("permits a markdown objects blocks array", () => {
      expect(
        isReadActivity({
          activityType: "read",
          blocks: [{ markdown: "hello" }, { markdown: "world" }],
        })
      ).toBe(true);
    });
  });

  describe("sad path", () => {
    it("requires activityType to be read", () => {
      expect(
        isReadActivity({
          activityType: "select-an-answer",
          blocks: [],
        })
      ).toBe(false);
    });

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

describe("isSelectAnAnswerActivity", () => {
  describe("happy path", () => {
    it("Allows one correct and one incorrect answer", () => {
      expect(
        isSelectAnAnswerActivity({
          activityType: "select-an-answer",
          blocks: ["What is 1 + 1?"],
          answers: [
            { text: "2", isCorrect: true },
            { text: "3", isCorrect: false },
          ],
        })
      ).toBe(true);
    });

    it("Allows one correct and multiple incorrect answers", () => {
      expect(
        isSelectAnAnswerActivity({
          activityType: "select-an-answer",
          blocks: ["What is 1 + 1?"],
          answers: [
            { text: "1", isCorrect: false },
            { text: "2", isCorrect: true },
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: false },
          ],
        })
      ).toBe(true);
    });
  });

  describe("sad path", () => {
    it("requires an answer key", () => {
      expect(
        isSelectAnAnswerActivity({
          activityType: "select-an-answer",
          blocks: ["test"],
        })
      ).toBe(false);
    });

    it("requires answers to be formatted correctly", () => {
      expect(
        isSelectAnAnswerActivity({
          activityType: "select-an-answer",
          blocks: ["test"],
          answers: ["not an answer"],
        })
      ).toBe(false);
    });
  });
});
