import React, { useMemo, useReducer, useState } from 'react';
import { shuffle } from 'lodash';
import riduce from 'riduce';
import LessonContent from '../LessonContent';
import { SelectAnAnswerActivity, SelectMultipleActivity } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import MultipleAnswerCard from '../../../components/atoms/MultipleAnswerCard';
import LessonContinueButton from '../LessonContinueButton';
import Notification, { NotificationProps } from '../../../components/atoms/Notification';

interface Props {
  activity: SelectMultipleActivity | SelectAnAnswerActivity
}

function LessonActivitySelectMultiple({
  activity: { blocks, answers }
}: Props) {
  const [notification, setNotification] = useState<NotificationProps>({ message: '', isShowing: false })

  const shuffledAnswers = useMemo(
    () => shuffle(answers),
    [answers]
  )

  const [reducer, actions] = useMemo(
    () => riduce(shuffledAnswers),
    [shuffledAnswers]
  )

  const [answersState, dispatch] = useReducer(reducer, shuffledAnswers)

  const allCorrectAnswersSelected = answersState.every(answer => !answer.isCorrect || answer.isSelected)

  const makeClickHandler = (
    answer: typeof answers[0],
    idx: number
  ) => () => {
    if (answer.isSelected) return

    dispatch(actions[idx].create.assign({
      isSelected: true
    }))

    if (answer.feedback) {
      if (typeof answer.feedback === 'string') {
        setNotification({
          message: answer.feedback,
          isShowing: true
        })
      } else {
        setNotification({
          header: answer.feedback.header,
          message: answer.feedback.message,
          buttonText: answer.feedback.buttonText,
          isShowing: true
        })
      }
    } else if (answer.isCorrect) {
      setNotification({
        message: 'Amazing!',
        isShowing: true
      })
    } else {
      setNotification({
        message: 'Not quite...',
        isShowing: true
      })
    }
  }

  return (
    <>
      <Notification
        isShowing={notification.isShowing}
        header={notification.header}
        message={notification.message}
        position='top'
        duration={1000}
        buttons={[notification.buttonText || 'Close']}
        onDidDismiss={() => {
          setNotification(prevState => ({
            ...prevState,
            isShowing: false
          }))

          dispatch(actions.create.do(answers => (
            answers.map(answer => (
              answer.isSelected && !answer.isCorrect
                ? { ...answer, isSelected: false }
                : answer
            ))
          )))
        }}
      />
      <LessonContent>
        {blocks.map(block => (
          <LessonContentBlock
            key={JSON.stringify(block)}
            block={block}
          />
        ))}
        {answersState.map((answer, idx) => (
          <MultipleAnswerCard
            key={answer.text}
            answer={answer}
            disabled={notification.isShowing}
            onClick={makeClickHandler(answer, idx)}
          />
        ))}
      </LessonContent>
      <LessonContinueButton
        disabled={!allCorrectAnswersSelected}
      />
    </>
  )
}

export default LessonActivitySelectMultiple;