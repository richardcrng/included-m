const BRANCH = "content-folder";

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
  console.log("route:", path, route);
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
    if (path["chapterId"]) {
      route.push(path["chapterId"]);
      if (path["lessonId"]) {
        route.push(path["lessonId"]);
      }
    }
  }
  return route;
};

const getTree = (path: string[]) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/repository/tree?path=${path.join(
      "/"
    )}&ref=${BRANCH}`
  );

const getIndex = (path: string[]) =>
  fetch(
    `https://gitlab.com/api/v4/projects/23270946/
repository/files/${encodeURIComponent(
      `${path.join("/")}/index.json`
    )}/raw?ref=${BRANCH}`
  );
