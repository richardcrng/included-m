import { setupTestServer } from "fireactive";
import Lesson from "../Lesson.old";

setupTestServer();

describe(".toRawDeep and .toRaw", () => {
  describe("for a lesson", () => {
    let lesson: Lesson;

    beforeAll(async () => {
      lesson = await Lesson.createFromRaw({
        lessonTitle: "test",
        activities: [
          {
            activityType: "read",
            blocks: ["hi there", "this is my lesson"],
          },
          {
            activityType: "select-for-each-blank",
            blocks: ["I have a {{weird thing}} here"],
            choices: {
              "{{weird thing}}": [
                { text: "weird thing", isCorrect: true },
                { text: "rando thing", isCorrect: false },
              ],
            },
          },
        ],
      });
    });

    test(".toRaw fetches ids but not actual activities", () => {
      const rawLesson = lesson.toRaw();
      expect(rawLesson.activityIds).toBeDefined();
      expect(rawLesson).not.toHaveProperty("activities");
    });

    test(".toRawDeep fetches activities and children within that by default", async () => {
      const rawLesson = await lesson.toRawDeep();
      expect(rawLesson.activities).toBeDefined();
      expect(rawLesson.activities[0].contentBlocks).toBeDefined();
      expect(rawLesson.activities[0].contentBlocks).toHaveLength(2);
      expect(rawLesson.activities[1].choices).toBeDefined();
      expect(rawLesson.activities[1].choices).toHaveLength(1);
    });
  });
});
