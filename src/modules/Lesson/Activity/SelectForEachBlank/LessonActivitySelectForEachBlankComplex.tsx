import React, { useReducer, useState } from 'react';
import { shuffle } from 'lodash';
import riduce, { bundle } from 'riduce';
import { answersFromBlocks, BlankOrText, hasBlanks } from './utils'
import LessonContent from '../../LessonContent';
import { SelectForEachBlankSimpleActivity, SelectMultipleAnswer } from '../../lesson-types';
import LessonContentBlock from '../../LessonContentBlock';
import LessonContinueButton from '../../LessonContinueButton';
import MultipleAnswerCard from '../../../../components/atoms/MultipleAnswerCard';
import Notification, { NotificationProps } from '../../../../components/atoms/Notification';

interface Props {
  activity: SelectForEachBlankSimpleActivity
}

function LessonActivitySelectForEachBlankComplex({
  activity: { blocks, choices }
}: Props) {
  const [notification, setNotification] = useState<NotificationProps>({ message: '', isShowing: false })

  const answers = answersFromBlocks(blocks)

  type Answer = typeof answers['any']

  const initialState = {
    answers: shuffle(answers),
    choices,
    selectedInput: Object.keys(answers)[0]
  }
  
  const [reducer, actions] = riduce(initialState)
  
  const [activityState, dispatch] = useReducer(reducer, initialState)

  const allAnswersLocked = activityState.answers.every(answer => answer.isLocked)

  const answerMatchesInput = (answer: Answer) => {
    return activityState.selectedInput === answer.match
  }

  const customChoices = choices && choices[activityState.selectedInput]

  const makeClickHandler = (
    answer: Answer,
    idx: number
  ) => () => {
    if (answer.isSelected || answer.isLocked) return

    dispatch(actions.answers[idx].isSelected.create.on())

    if (answerMatchesInput(answer)) {
      setNotification({
        message: 'Amazing!',
        isShowing: true,
        color: 'success'
      })
      dispatch(bundle([
        actions.answers[idx].isLocked.create.on(),
        actions.selectedInput.create.do(() => {
          const answersArr = Object.values(activityState.answers)
          const currIndex = answersArr.findIndex(answerMatchesInput)
          return currIndex < answersArr.length - 1
            ? answersArr[currIndex + 1].match
            : answersArr[0].match
        })
      ]))

    } else {
      setNotification({
        message: 'Not quite...',
        isShowing: true,
        color: 'warning'
      })
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

          !choices && dispatch(actions.answers.create.do(answers => (
            answers.map(answer => (
              answer.isSelected && !answerMatchesInput(answer)
                ? { ...answer, isSelected: false }
                : answer
            ))
          )))

          choices && dispatch(actions.choices.create.do(choices => (
            choices && Object.fromEntries(Object.entries(choices).map(
              ([key, answers]) => [key, answers.map(answer => (
                key === activityState.selectedInput
                  && answer.isSelected && !answer.isCorrect
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

                const matchingAnswer = activityState.answers.find(
                  answer => answer.match === match
                )

                const nodes = [
                  ...acc.nodes,
                  <span key={before}>{before}</span>,
                  <BlankOrText
                    key={match}
                    matchingAnswer={matchingAnswer}
                    onInputClick={() => {
                      if (matchingAnswer) {
                        dispatch(actions.selectedInput.create.update(
                        matchingAnswer.match
                      ))
                      }
                    }}
                    showFocus={!!matchingAnswer && answerMatchesInput(matchingAnswer)}
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
        {!choices && activityState.answers.map((answer, idx) => (
          <MultipleAnswerCard
            key={answer.text}
            answer={{
              ...answer,
              isSelected: answer.isLocked || answer.isSelected,
              isCorrect: answer.isLocked || answerMatchesInput(answer)
            }}
            disabled={notification.isShowing}
            onClick={makeClickHandler(answer, idx)}
          />
        ))}
        {choices && choices[activityState.selectedInput] && (
          choices[activityState.selectedInput].map((answer, idx) => (
            <MultipleAnswerCard
              key={answer.text}
              answer={answer}
              disabled={notification.isShowing}
              onClick={() => {
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
              }}
            />
          )
        ))}
      </LessonContent>
      <LessonContinueButton
        disabled={!allAnswersLocked}
      />
    </>
  )
}

export default LessonActivitySelectForEachBlankComplex;