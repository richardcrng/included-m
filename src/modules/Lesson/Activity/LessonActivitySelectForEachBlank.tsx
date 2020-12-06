import React, { useMemo, useReducer, useState } from 'react';
import {
  IonAlert,
} from '@ionic/react';
import styled from 'styled-components'
import { Notification } from 'react-rainbow-components';
import { shuffle } from 'lodash';
import riduce from 'riduce';
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
  isSelected: boolean
}

interface BlankProps {
  showFocus?: boolean
}

const Blank = styled.input`
  display: inline-block;
  width: 5rem;
  height: 1rem;

  -webkit-transition: all 0.15s ease-in-out;
  -moz-transition: all 0.15s ease-in-out;
  -ms-transition: all 0.15s ease-in-out;
  -o-transition: all 0.15s ease-in-out;
  outline: none;
  border: ${(p: BlankProps) => p.showFocus ? '1px solid rgba(81, 203, 238, 1)' : '1px solid #DDDDDD'};
  box-shadow: ${(p: BlankProps) => p.showFocus ? '0 0 5px rgba(81, 203, 238, 1)' : undefined};
  background-color: ${(p: BlankProps) => p.showFocus ? 'rgba(81, 203, 238, 0.8)' : undefined};
`

const hasBlanks = (str: string) => str.match(/{{(.+?)}}/g)

function LessonActivitySelectForEachBlank({
  activity: { blocks, }
}: Props) {
  const [notification, setNotification] = useState<Notification>({ message: '', isShowing: false })


  const answers = useMemo(() => (
    blocks.reduce(
      (acc, block) => {
        const matches = hasBlanks(block)
        return matches
          ? [
              ...acc,
              ...matches.map(str => ({
                match: str,
                text: str.substring(2, str.length - 2),
                isSelected: false
              }))
            ]
          : acc
      },
      [] as SelectForEachBlankAnswer[]
    )
  ), [blocks])

  const initialState = useMemo(
    () => ({
      // inputs: Object.fromEntries(answers.map(answer => [
      //   answer.match, answer
      // ])),
      answers: shuffle(answers),
      selectedInput: answers[0].match
    }),
    [answers]
  )

  const [reducer, actions] = useMemo(
    () => riduce(initialState),
    [initialState]
  )

  const [activityState, dispatch] = useReducer(reducer, initialState)

  const allCorrectAnswersSelected = activityState.answers.every(answer => answer.isSelected)

  // const makeClickHandler = (
  //   answer: typeof answers[0],
  //   idx: number
  // ) => () => {
  //   if (answer.isSelected) return

  //   dispatch(actions[idx].create.assign({
  //     isSelected: true
  //   }))

  //   if (answer.feedback) {
  //     if (typeof answer.feedback === 'string') {
  //       setNotification({
  //         message: answer.feedback,
  //         isShowing: true
  //       })
  //     } else {
  //       setNotification({
  //         header: answer.feedback.header,
  //         message: answer.feedback.message,
  //         buttonText: answer.feedback.buttonText,
  //         isShowing: true
  //       })
  //     }
  //   } else if (answer.isCorrect) {
  //     setNotification({
  //       message: 'Amazing!',
  //       isShowing: true
  //     })
  //   } else {
  //     setNotification({
  //       message: 'Not quite...',
  //       isShowing: true
  //     })
  //   }
  // }

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

          // dispatch(actions.create.do(answers => (
          //   answers.map(answer => (
          //     answer.isSelected && !answer.isCorrect
          //       ? { ...answer, isSelected: false }
          //       : answer
          //   ))
          // )))
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
                  <Blank
                    key={match}
                    onClick={() => {
                      dispatch(actions.selectedInput.create.update(match))
                    }}
                    showFocus={activityState.selectedInput === match}
                    readOnly
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
              isCorrect: false
            }}
            onClick={() => null}
            // onClick={makeClickHandler(answer, idx)}
          />
        ))}
      </LessonContent>
      <LessonContinueButton
        disabled={!allCorrectAnswersSelected}
      />
    </>
  )
}

export default LessonActivitySelectForEachBlank;