import React, { useMemo, useReducer, useState } from 'react';
import {
  IonAlert
} from '@ionic/react';
import { Notification, Input } from 'react-rainbow-components';
import { shuffle } from 'lodash';
import riduce from 'riduce';
import LessonContent from '../LessonContent';
import { SelectForEachBlankSimpleActivity } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import LessonContinueButton from '../LessonContinueButton';
// import MultipleAnswerCard from '../../../components/atoms/MultipleAnswerCard';

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

const hasBlanks = (str: string) => str.match(/{{(.+?)}}/g)

function LessonActivitySelectForEachBlank({
  activity: { blocks, }
}: Props) {
  const [notification, setNotification] = useState<Notification>({ message: '', isShowing: false })

  const answers = useMemo(() => (
    blocks.reduce(
      (acc, block) => {
        const matches = hasBlanks(block)
        console.log(matches)
        return matches
          ? [
              ...acc,
              ...matches.map(str => ({
                match: str,
                text: str.substring(2, str.length - 3),
                isSelected: false
              }))
            ]
          : acc
      },
      [] as SelectForEachBlankAnswer[]
    )
  ), [blocks])


  const shuffledAnswers = useMemo(
    () => shuffle(answers),
    [answers]
  )

  const [reducer, actions] = useMemo(
    () => riduce(shuffledAnswers),
    [shuffledAnswers]
  )

  const [answersState, dispatch] = useReducer(reducer, shuffledAnswers)

  const allCorrectAnswersSelected = answersState.every(answer => answer.isSelected)

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
                  <input key={match} disabled style={{ width: '5rem' }} />
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
        {/* {answersState.map((answer, idx) => (
          <MultipleAnswerCard
            key={answer.text}
            answer={answer}
            onClick={makeClickHandler(answer, idx)}
          />
        ))} */}
      </LessonContent>
      <LessonContinueButton
        disabled={!allCorrectAnswersSelected}
      />
    </>
  )
}

export default LessonActivitySelectForEachBlank;