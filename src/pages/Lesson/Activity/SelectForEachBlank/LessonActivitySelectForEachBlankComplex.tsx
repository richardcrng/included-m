import React, { useReducer, useState } from 'react';
import { shuffle } from 'lodash';
import riduce from 'riduce';
import Markdown from 'markdown-to-jsx'
import { BlankOrText, hasBlanks, SelectForEachBlankAnswerComplex } from './utils'
import LessonContent from '../../LessonContent';
import LessonContentBlock from '../../LessonContentBlock';
import LessonContinueButton from '../../LessonContinueButton';
import MultipleAnswerCard from '../../../../components/atoms/MultipleAnswerCard';
import Notification, { NotificationProps } from '../../../../components/atoms/Notification';
import { SelectForEachBlankComplexActivity } from '../../../../content/types';

interface Props {
  activity: SelectForEachBlankComplexActivity
}

function LessonActivitySelectForEachBlankComplex({
  activity: { blocks, choices }
}: Props) {
  const [notification, setNotification] = useState<NotificationProps>({ message: '', isShowing: false })

  const choiceEntries = Object.entries(choices)

  const shuffledChoices = Object.fromEntries(choiceEntries.map(([match, answers]) => [match, shuffle(answers.map(answer => ({
    ...answer, isLocked: false, match, isSelected: false
  })))]))

  const initialState = {
    choices: shuffledChoices,
    selectedInput: choiceEntries[0][0]
  }
  
  const [reducer, actions] = riduce(initialState)
  
  const [activityState, dispatch] = useReducer(reducer, initialState)

  const activeChoices = activityState.choices[activityState.selectedInput]

  console.log(activeChoices)

  type Answer = typeof activeChoices[0]

  const allChoicesLocked = Object.values(activityState.choices).every(answers => answers.some(answer => answer.isLocked))


  const makeClickHandler = (
    answer: Answer,
    idx: number
  ) => () => {
    console.log(answer)

    if (answer.isSelected || answer.isLocked || allChoicesLocked) return

    dispatch(actions.choices[activityState.selectedInput][idx].create.assign({ isSelected: true }))

    const color = answer.isCorrect ? 'success' : 'warning'

    const feedback = answer.feedback
      ? answer.feedback
      : answer.isCorrect ? "That's it!" : 'Not quite'

    if (typeof feedback === 'string') {
      setNotification({
        message: feedback,
        color,
        isShowing: true
      })
    } else {
      setNotification({
        ...feedback,
        color,
        isShowing: true
      })
    }

    if (answer.isCorrect) {
      const matchers = Object.keys(choices)
      const currIdx = matchers.findIndex(key => key === answer.match)
      dispatch(actions.choices[activityState.selectedInput][idx].create.assign({ isLocked: true }))

      if (currIdx < matchers.length - 1) {
        dispatch(actions.selectedInput.create.update(matchers[currIdx + 1]))
      }
    }
  }

  return (
    <>
      <Notification
        header={notification.header}
        color={notification.color}
        isShowing={notification.isShowing}
        onDidDismiss={() => {
          setNotification(prevState => ({
            ...prevState,
            isShowing: false
          }))

          dispatch(actions.choices.create.do(choices => (
            Object.fromEntries(Object.entries(choices).map(
              ([key, answers]) => [key, answers.map(answer => (
                key === activityState.selectedInput
                  && answer.isSelected && !answer.isCorrect && !answer.isLocked
                    ? { ...answer, isSelected: false }
                    : answer
              ))]
            ))
          )))
        }}
        message={notification.message}
        buttons={[notification.buttonText || 'Close']}
      />
      <LessonContent>
        {blocks.map(block => {
          const blockBlanks = hasBlanks(block)
          if (blockBlanks) {
            const { remaining, nodes } = blockBlanks.reduce(
              (acc, match) => {
                const [before, remaining] = acc.remaining.split(match)

                const matchingAnswer: SelectForEachBlankAnswerComplex | undefined = activityState.choices[match].find(
                  answer => answer.isCorrect
                )

                const nodes = [
                  ...acc.nodes,
                  <Markdown key={before}>{before}</Markdown>,
                  <BlankOrText
                    key={match}
                    matchingAnswer={matchingAnswer}
                    onInputClick={() => {
                      dispatch(actions.selectedInput.create.update(match))
                    }}
                    showFocus={activityState.selectedInput === match}
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
        {!allChoicesLocked && activeChoices && activeChoices.map((answer, idx) => (
            <MultipleAnswerCard
              key={`${answer.match}-${answer.text}`}
              answer={answer}
              disabled={notification.isShowing}
              onClick={makeClickHandler(answer, idx)}
            />
          )
        )}
      </LessonContent>
      <LessonContinueButton
        disabled={!allChoicesLocked}
      />
    </>
  )
}

export default LessonActivitySelectForEachBlankComplex;