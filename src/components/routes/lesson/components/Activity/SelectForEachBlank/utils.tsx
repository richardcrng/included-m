import React from "react";
import styled from "styled-components";
import { BlockBase } from "../../../../../../lib/models/Activity";
import { ChoiceAnswerState } from "./LessonActivitySelectForEachBlankComplex";

interface InputProps {
  showFocus?: boolean;
}

const Input = styled.input`
  display: inline-block;
  width: 5rem;
  height: 1rem;

  -webkit-transition: all 0.15s ease-in-out;
  -moz-transition: all 0.15s ease-in-out;
  -ms-transition: all 0.15s ease-in-out;
  -o-transition: all 0.15s ease-in-out;
  outline: none;
  border: ${(p: InputProps) =>
    p.showFocus ? "1px solid rgba(81, 203, 238, 1)" : "1px solid #DDDDDD"};
  box-shadow: ${(p: InputProps) =>
    p.showFocus ? "0 0 5px rgba(81, 203, 238, 1)" : undefined};
  background-color: ${(p: InputProps) =>
    p.showFocus ? "rgba(81, 203, 238, 0.8)" : undefined};
`;

const LockedAnswer = styled.span`
  font-weight: bold;
  color: green;
`;

export const hasBlanks = (str: string) => str.match(/{{(.+?)}}/g);

export const allBlanks = (blocks: (string | BlockBase)[]): string[] => {
  return blocks.reduce((acc, block) => {
    const markdown = typeof block === "string" ? block : block.markdown;
    const matches = hasBlanks(markdown);
    return matches ? [...acc, ...matches] : acc;
  }, [] as string[]);
};

export const answersFromBlocks = (
  blocks: (string | BlockBase)[]
): Record<string, ChoiceAnswerState> => {
  return blocks.reduce((acc: Record<string, ChoiceAnswerState>, block) => {
    const markdown = typeof block === "string" ? block : block.markdown;

    const matches = hasBlanks(markdown);
    return matches
      ? {
          ...acc,
          ...Object.fromEntries(
            matches.map((str) => [
              str,
              {
                textMatch: str,
                text: str.substring(2, str.length - 2),
                isSelected: false,
                isLocked: false,
              } as ChoiceAnswerState,
            ])
          ),
        }
      : acc;
  }, {} as Record<string, ChoiceAnswerState>);
};

interface BlankOrTextProps {
  matchingAnswer?: ChoiceAnswerState;
  onInputClick(): void;
  showFocus: boolean;
}

export function BlankOrText({
  matchingAnswer,
  onInputClick,
  showFocus,
}: BlankOrTextProps) {
  if (!matchingAnswer) return null;

  if (matchingAnswer.isLocked) {
    return <LockedAnswer>{matchingAnswer.text}</LockedAnswer>;
  } else {
    return <Input onClick={onInputClick} showFocus={showFocus} readOnly />;
  }
}
