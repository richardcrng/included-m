import { isPlainObj } from "ramda-adjunct";
import {
  ContentBlockJSON,
  ReadActivityJSON,
} from "../types/content-yaml.types";
import { hasOwnProperty } from "./utils";

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
  return true;
}
