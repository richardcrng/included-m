import { isPlainObj } from "ramda-adjunct";
import {
  ActivityType,
  AnswerJSON,
  ContentBlockJSON,
  ReadActivityJSON,
  SelectAnAnswerActivityJSON,
} from "../types/content-yaml.types";
import { hasOwnProperties, hasOwnProperty } from "./utils";

export function isAnswerBlock(
  parsedYamlBlock: unknown
): parsedYamlBlock is AnswerJSON {
  if (
    isPlainObj(parsedYamlBlock) &&
    hasOwnProperties(parsedYamlBlock, ["text", "isCorrect"])
  ) {
    return (
      typeof parsedYamlBlock.text === "string" &&
      typeof parsedYamlBlock.isCorrect === "boolean"
    );
  }

  return false;
}

export function isArrayOf<T>(
  maybeArray: unknown,
  isType: (element: T) => element is T
): maybeArray is T[] {
  return Array.isArray(maybeArray) && maybeArray.every(isType);
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
      isArrayOf(parsedYaml.blocks, isContentBlock)
    );
  }

  return false;
}

export function isSelectAnAnswerActivity(
  parsedYaml: object
): parsedYaml is SelectAnAnswerActivityJSON {
  if (hasOwnProperties(parsedYaml, ["activityType", "blocks", "answers"])) {
    return (
      parsedYaml.activityType === ActivityType.SELECT_AN_ANSWER &&
      isArrayOf(parsedYaml.blocks, isContentBlock) &&
      isArrayOf(parsedYaml.answers, isAnswerBlock)
    );
  }

  return false;
}
