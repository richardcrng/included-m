import React, { useMemo, useReducer, useState } from 'react';
import {
  IonButton, IonHeader, IonAlert
} from '@ionic/react';
import { Notification } from 'react-rainbow-components';
import { shuffle } from 'lodash';
import riduce from 'riduce';
import LessonContent from '../LessonContent';
import { SelectMultipleActivity } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import MultipleAnswerCard from '../../../components/atoms/MultipleAnswerCard';
import LessonToolbar from '../../../components/molecules/LessonToolbar';
import LessonContinueButton from '../../LessonContinueButton';

interface Props {
  activity: SelectMultipleActivity
}

type Notification =
  { header?: string, message: string, buttonText?: string, isShowing: boolean }

function LessonActivitySelectMultiple({
  activity: { blocks, answers }
}: Props) {
  const [notification, setNotification] = useState<Notification>({ message: '', isShowing: false })

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
    if (!answer.isSelected) {
      dispatch(actions[idx].create.assign({
        isSelected: true
      }))
    }

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
      <IonHeader>
        <LessonToolbar
          currentPage={2}
          totalPages={11}
          message='Select all answers that apply'
        />
      </IonHeader>
      <IonAlert
        header={notification.header}
        isOpen={notification.isShowing}
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
        message={notification.message}
        buttons={[notification.buttonText || 'Back']}
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