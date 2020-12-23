const BRANCH = "content-folder";

type ContentPath =
  | { courseId: string; topicId?: never; chapterId?: never; lessonId?: never }
  | { courseId: string; topicId: string; chapterId?: never; lessonId?: never }
  | { courseId: string; topicId: string; chapterId: string; lessonId?: never }
  | { courseId: string; topicId: string; chapterId: string; lessonId: string };

export function getContent(path: ContentPath): Promise<GitLabTreeContent[]>;
export function getContent(
  path: ContentPath,
  target: "tree"
): Promise<GitLabTreeContent[]>;
export function getContent<T = any>(
  path: ContentPath,
  target: "index.json"
): Promise<T>;

export function getContent<T = any>(
  path: ContentPath,
  target: "index.json" | "tree" = "index.json"
) {
  const route = contentStringPath(path);
  if (target === "tree") {
    return getTree(route);
  } else {
    return getIndex<T>(route);
  }
}

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

interface GitLabTreeContent {
  id: string;
  name: string;
  type: "tree" | "blob";
  path: string;
  mode: string;
}

const getTree = async (path: string[]) => {
  const json = await fetch(
    `https://gitlab.com/api/v4/projects/23270946/repository/tree?path=${path.join(
      "/"
    )}&ref=${BRANCH}`
  ).then((res) => res.json());

  return json as GitLabTreeContent[];
};

const getIndex = async <T = any>(path: string[]) => {
  const json = await fetch(
    `https://gitlab.com/api/v4/projects/23270946/
repository/files/${encodeURIComponent(
      `${path.join("/")}/index.json`
    )}/raw?ref=${BRANCH}`
  ).then((res) => res.json());
  return json as T;
};
