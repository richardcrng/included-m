import React, { useReducer, useState } from 'react';
import { shuffle } from 'lodash';
import riduce from 'riduce';
import Markdown from 'markdown-to-jsx'
import { BlankOrText, hasBlanks } from './utils'
import LessonContent from '../../LessonContent';
import LessonContentBlock from '../../LessonContentBlock';
import LessonContinueButton from '../../LessonContinueButton';
import MultipleAnswerCard from '../../../../../ui/atoms/MultipleAnswerCard';
import Notification, { NotificationProps } from '../../../../../ui/atoms/Notification';
import { ActivityRawDeep } from '../../../../../models/Activity';
import { AnswerRaw } from '../../../../../models/Answer';

interface Props {
  activity: ActivityRawDeep
}

export interface ChoiceAnswerState extends AnswerRaw {
  isLocked: boolean,
  isSelected: boolean,
  textMatch: string
}

function LessonActivityCRUDSelectForEachBlankComplex({
  activity: { contentBlocks: blocks, choices }
}: Props) {
  const [notification, setNotification] = useState<NotificationProps>({ message: '', isShowing: false })

  const choiceToAnswerEntries: [string, ChoiceAnswerState[]][] = choices.map(choice => {
    const mappedAnswers: ChoiceAnswerState[] = choice.answers.map(answer => ({
      ...answer,
      isLocked: false,
      isSelected: false,
      textMatch: choice.textMatch
    }))

    const shuffledAnswers = shuffle(mappedAnswers)

    return [choice.textMatch, shuffledAnswers]
  })

  const shuffledChoices = Object.fromEntries(choiceToAnswerEntries)

  const initialState = {
    choices: shuffledChoices,
    selectedInput: choiceToAnswerEntries[0][0]
  }
  
  const [reducer, actions] = riduce(initialState)
  
  const [activityState, dispatch] = useReducer(reducer, initialState)

  const activeChoices = activityState.choices[activityState.selectedInput]

  type Answer = typeof activeChoices[0]

  const allChoicesLocked = Object.values(activityState.choices).every(answers => answers.some(answer => answer.isLocked))


  const makeClickHandler = (
    answer: Answer,
    idx: number
  ) => () => {
    if (answer.isSelected || answer.isLocked || allChoicesLocked) return

    dispatch(actions.choices[activityState.selectedInput][idx].create.assign({ isSelected: true }))

    const color = answer.isCorrect ? 'success' : 'warning'

    const feedback = answer.feedback
      ? answer.feedback
      : answer.isCorrect ? "That's it!" : 'Not quite'

    setNotification({
        message: feedback,
        color,
        isShowing: true
      })

    if (answer.isCorrect) {
      const matchers = Object.keys(choices)
      const currIdx = matchers.findIndex(key => key === answer.textMatch)
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
          const { markdown } = block

          const blockBlanks = hasBlanks(markdown)
          if (blockBlanks) {
            const { remaining, nodes } = blockBlanks.reduce(
              (acc, match) => {
                const [before, remaining] = acc.remaining.split(match)

                const matchingAnswer: ChoiceAnswerState | undefined = activityState.choices[match].find(
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
              { remaining: markdown, nodes: [] as React.ReactNode[] }
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
              key={`${answer.textMatch}-${answer.text}`}
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

export default LessonActivityCRUDSelectForEachBlankComplex;