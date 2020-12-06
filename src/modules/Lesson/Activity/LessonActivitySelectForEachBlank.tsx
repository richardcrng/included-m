import React, { useReducer, useState, useMemo } from 'react';
import {
  IonAlert,
} from '@ionic/react';
import styled from 'styled-components'
import { Notification } from 'react-rainbow-components';
import { shuffle } from 'lodash';
import riduce, { bundle } from 'riduce';
import LessonContent from '../LessonContent';
import { SelectForEachBlankSimpleActivity } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import LessonContinueButton from '../LessonContinueButton';
import MultipleAnswerCard from '../../../components/atoms/MultipleAnswerCard';

interface Props {
  activity: SelectForEachBlankSimpleActivity
}

type Notification =
  { header?: string, message: string, buttonText?: string, isShowing: boolean }

export type SelectForEachBlankAnswer = {
  match: string,
  text: string,
  isSelected: boolean,
  isLocked: boolean,
  inputIndex: number
}

export type MatchPlaceholder = {
  match: string,
  text: string,
  isComplete: boolean,
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


const hasBlanks = (str: string) => str.match(/{{(.+?)}}/g)

function LessonActivitySelectForEachBlank({
  activity: { blocks, }
}: Props) {
  const [notification, setNotification] = useState<Notification>({ message: '', isShowing: false })


  const answers = blocks.reduce(
    (acc, block, index) => {
      const matches = hasBlanks(block)
      return matches
        ? [
            ...acc,
            ...matches.map(str => ({
              match: str,
              text: str.substring(2, str.length - 2),
              isSelected: false,
              isLocked: false,
              inputIndex: index
            }))
          ]
        : acc
    },
    [] as SelectForEachBlankAnswer[]
  )

  const initialState = {
    answers: shuffle(answers),
    selectedInputIndex: 0
  }
  

  const [reducer, actions] = riduce(initialState)
  
  const [activityState, dispatch] = useReducer(reducer, initialState)
  const selectedInput = answers[activityState.selectedInputIndex]?.match

  const answerMatchesInput = (answer: SelectForEachBlankAnswer) => {
    return selectedInput === answer.match
  }

  const allAnswersLocked = activityState.answers.every(answer => answer.isLocked)

  const makeClickHandler = (
    answer: typeof answers[0],
    idx: number
  ) => () => {
    if (answer.isSelected) return

    dispatch(actions.answers[idx].isSelected.create.on())

    if (answer.match === selectedInput) {
      setNotification({ message: 'Amazing!', isShowing: true })
      dispatch(bundle([
        actions.answers[idx].isLocked.create.on(),
        actions.selectedInputIndex.create.do(idx => (
          Math.min(answers.length, idx + 1)
        ))
      ]))

    } else {
      setNotification({
        message: 'Not quite...',
        isShowing: true
      })
    }
  }

  const BlankOrText = useMemo(() => {
    return function BlankorText({ matchingAnswer }: { matchingAnswer?: SelectForEachBlankAnswer  }) {
      if (!matchingAnswer) return null

      if (matchingAnswer.isLocked) {
        return <LockedAnswer>{matchingAnswer.text}</LockedAnswer>
      } else {
        return (
          <Input
            key={matchingAnswer.match}
            onClick={() => {
              dispatch(actions.selectedInputIndex.create.update(
                matchingAnswer.inputIndex
              ))
            }}
            showFocus={answerMatchesInput(matchingAnswer)}
            readOnly
          />
        )
      }
    }
  }, [Input, dispatch, actions, answerMatchesInput])

  return (
    <>
      <IonAlert
        header={notification.header}
        isOpen={notification.isShowing}
        onDidDismiss={() => {
          setNotification(prevState => ({
            ...prevState,
            isShowing: false
          }))

          dispatch(actions.answers.create.do(answers => (
            answers.map(answer => (
              answer.isSelected && !answerMatchesInput(answer)
                ? { ...answer, isSelected: false }
                : answer
            ))
          )))
        }}
        message={notification.message}
        buttons={[notification.buttonText || 'Back']}
      />
      <LessonContent>
        {blocks.map(block => {
          const blockBlanks = hasBlanks(block)
          if (blockBlanks) {
            const { remaining, nodes } = blockBlanks.reduce(
              (acc, match) => {
                const [before, remaining] = acc.remaining.split(match)
                const nodes = [
                  ...acc.nodes,
                  <span key={before}>{before}</span>,
                  <BlankOrText
                    key={match}
                    matchingAnswer={activityState.answers.find(
                      answer => answer.match === match
                    )}
                  />
                ]

                return { remaining, nodes }
              },
              { remaining: block, nodes: [] as React.ReactNode[] }
            )

            return (
              <p key={JSON.stringify(block)}>
                {nodes}
                <span>{remaining}</span>
              </p>
            )
          } else {
            return (
              <LessonContentBlock
                key={JSON.stringify(block)}
                block={block}
              />
            )
          }
        })}
        {activityState.answers.map((answer, idx) => (
          <MultipleAnswerCard
            key={answer.text}
            answer={{
              ...answer,
              isSelected: answer.isLocked || answer.isSelected,
              isCorrect: answer.isLocked || answer.match === selectedInput
            }}
            onClick={makeClickHandler(answer, idx)}
          />
        ))}
      </LessonContent>
      <LessonContinueButton
        disabled={!allAnswersLocked}
      />
    </>
  )
}

export default LessonActivitySelectForEachBlank;