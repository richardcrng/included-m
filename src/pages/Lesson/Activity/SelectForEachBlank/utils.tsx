import React from 'react';
import styled from 'styled-components'
import { AnswerFeedback, ContentBlockCRUD } from '../../../../content/types';

export interface SelectForEachBlankAnswer {
  match: string,
  text: string,
  isSelected: boolean,
  isLocked: boolean,
}

export interface SelectForEachBlankAnswerComplex extends SelectForEachBlankAnswer {
  isCorrect: boolean,
  feedback?: AnswerFeedback
}

interface InputProps {
  showFocus?: boolean
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
  border: ${(p: InputProps) => p.showFocus ? '1px solid rgba(81, 203, 238, 1)' : '1px solid #DDDDDD'};
  box-shadow: ${(p: InputProps) => p.showFocus ? '0 0 5px rgba(81, 203, 238, 1)' : undefined};
  background-color: ${(p: InputProps) => p.showFocus ? 'rgba(81, 203, 238, 0.8)' : undefined};
`

const LockedAnswer = styled.span`
  font-weight: bold;
  color: green;
`

export const hasBlanks = (str: string) => str.match(/{{(.+?)}}/g)

export const answersFromBlocks = (blocks: ContentBlockCRUD[]): Record<string, SelectForEachBlankAnswer> => {
  return blocks.reduce(
    (
      acc: Record<string, SelectForEachBlankAnswer>,
      block
    ) => {
      // TODO: handle non-string blocks
      if (typeof block !== 'string') {
        return acc
      }

      const matches = hasBlanks(block)
      return matches
        ? {
            ...acc,
            ...Object.fromEntries(matches.map(str => [
              str,
              {
                match: str,
                text: str.substring(2, str.length - 2),
                isSelected: false,
                isLocked: false
              }
            ]))
          }
        : acc
    },
    {} as Record<string, SelectForEachBlankAnswer>
  )
}

interface BlankOrTextProps {
  matchingAnswer?: SelectForEachBlankAnswer,
  onInputClick(): void,
  showFocus: boolean
}

export function BlankOrText({
  matchingAnswer,
  onInputClick,
  showFocus
}: BlankOrTextProps) {

  if (!matchingAnswer) return null

  if (matchingAnswer.isLocked) {
    return <LockedAnswer>{matchingAnswer.text}</LockedAnswer>
  } else {
    return (
      <Input
        onClick={onInputClick}
        showFocus={showFocus}
        readOnly
      />
    )
  }
}
