const BRANCH = "content-folder";

type PathParam = "courseId" | "topicId" | "chapterId" | "lessonId";

const pathHierarchy: PathParam[] = [
  "courseId",
  "topicId",
  "chapterId",
  "lessonId",
];

type ContentPath =
  | { courseId: string; topicId?: never; chapterId?: never; lessonId?: never }
  | { courseId: string; topicId: string; chapterId?: never; lessonId?: never }
  | { courseId: string; topicId: string; chapterId: string; lessonId?: never }
  | { courseId: string; topicId: string; chapterId: string; lessonId: string };

export const getContent = (
  path: ContentPath,
  target: "index.json" | "tree" = "index.json"
) => {
  const route = contentStringPath(path);
  if (target === "tree") {
    return getTree(route);
  } else {
    return getIndex(route);
  }
};

const contentStringPath = (path: ContentPath): string[] => {
  const route: string[] = ["content", path["courseId"]];
  if (path["topicId"]) {
    route.push(path["topicId"]);
    if (path["courseId"]) {
      route.push(path["courseId"]);
      if (path["chapterId"]) {
        route.push(path["chapterId"]);
        if (path["lessonId"]) {
          route.push(path["lessonId"]);
        }
      }
    }
  }
  return route;
};

// export const getCourseTree = (courseId: string) =>
//   fetch(
//     `https://gitlab.com/api/v4/projects/23270946/repository/tree?path=${courseId}/main&ref=${BRANCH}`
//   );

// export const getCourseIndex = (courseId: string) =>
//   fetch(
//     `https://gitlab.com/api/v4/projects/23270946/
// repository/files/${encodeURIComponent(
//       `content/${courseId}/index.json`
//     )}/raw?ref=${BRANCH}`
//   );

export const getTree = (path: string[]) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/repository/tree?path=${path.join(
      "/"
    )}&ref=${BRANCH}`
  );

export const getIndex = (path: string[]) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/
repository/files/${encodeURIComponent(
      `${path.join("/")}/index.json`
    )}/raw?ref=${BRANCH}`
  );
