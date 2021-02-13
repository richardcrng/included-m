import { safeLoad } from "js-yaml";
import { ContentYaml, FetchedYaml, ParsedYaml } from "./content-types";
import { ContentPath, ContentRoute, contentStringPath } from "./getContent";
import { fetchPublicYaml } from "./public/getContent";

// interface YamlContent<T extends PublicYamlContent | GitlabYamlContent> {
//   new (path: ContentPath): T;

//   parse<T extends ContentYaml = ContentYaml>(): ParsedYaml<T>;
// }

class YamlProcessor {
  #path: ContentPath;

  constructor(path: ContentPath) {
    this.#path = path;
  }

  public async fetchFromPublic(): Promise<ProcessedYaml> {
    const fetchedYaml = await fetchPublicYaml(this.#path);
    return new ProcessedYaml(fetchedYaml);
  }
}

class ProcessedYaml {
  constructor(fetchedYaml: FetchedYaml) {
    const yaml = safeLoad(fetchedYaml.raw);
  }
}

class GitlabYamlContent {}
