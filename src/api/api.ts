const BRANCH = "content-folder";

type ContentPath =
  | Record<"courseId", string>
  | Record<"courseId" | "topicId", string>
  | Record<"courseId" | "topicId" | "chapterId", string>
  | Record<"courseId" | "topicId" | "chapterId" | "lessonId", string>;

export const getContent = (
  path: ContentPath,
  opts: {
    target: "file" | "directory";
  }
) => {};

export const getCourseTree = (courseId: string) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/repository/tree?path=${courseId}/main&ref=${BRANCH}`
  );

export const getCourseIndex = (courseId: string) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/
repository/files/${encodeURIComponent(
      `content/${courseId}/index.json`
    )}/raw?ref=${BRANCH}`
  );

export const getTree = (path: string[]) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/repository/tree?path=${path.join(
      "/"
    )}/main&ref=${BRANCH}`
  );

export const getIndex = (path: string[]) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/
repository/files/${encodeURIComponent(
      `content/${path.join("/")}/index.json`
    )}/raw?ref=${BRANCH}`
  );
