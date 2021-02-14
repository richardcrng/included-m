import { isPlainObj } from "ramda-adjunct";
import {
  ActivityType,
  ContentBlockJSON,
  ReadActivityJSON,
} from "../types/content-yaml.types";
import { hasOwnProperties, hasOwnProperty } from "./utils";

export function isArrayOfContentBlocks(
  maybeArray: unknown
): maybeArray is ContentBlockJSON[] {
  return Array.isArray(maybeArray) && maybeArray.every(isContentBlock);
}

export function isContentBlock(
  parsedYamlBlock: unknown
): parsedYamlBlock is ContentBlockJSON {
  if (isPlainObj(parsedYamlBlock)) {
    return (
      hasOwnProperty(parsedYamlBlock, "markdown") &&
      typeof parsedYamlBlock.markdown === "string"
    );
  } else {
    return typeof parsedYamlBlock === "string";
  }
}

export function isReadActivity(
  parsedYaml: object
): parsedYaml is ReadActivityJSON {
  if (hasOwnProperties(parsedYaml, ["activityType", "blocks"])) {
    return (
      parsedYaml.activityType === ActivityType.READ &&
      isArrayOfContentBlocks(parsedYaml.blocks)
    );
  }

  return false;
}
