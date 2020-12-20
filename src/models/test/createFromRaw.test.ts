import { setupTestServer } from "fireactive";
import Course from "../Course";
import Topic from "../Topic.old";
import { sampleContent } from "./sample-content";

setupTestServer();

describe("Cascading course creation", () => {
  test("Starting with a blank database", async () => {
    const coursesBefore = await Course.find({});
    expect(coursesBefore).toHaveLength(0);

    const topicsBefore = await Topic.find({});
    expect(topicsBefore).toHaveLength(0);
  });

  it("Creates a new course in the database", async () => {
    const course = await Course.createFromRaw(sampleContent);

    expect(course._id).toBeDefined();
    expect(course.topicIds.length).toBeGreaterThan(0);

    const coursesAfter = await Course.find({});
    expect(coursesAfter).toHaveLength(1);
  });

  it("Cascades down to children", async () => {
    const topicsAfter = await Topic.find({});
    expect(topicsAfter.length).toBeGreaterThan(0);
  });
});
