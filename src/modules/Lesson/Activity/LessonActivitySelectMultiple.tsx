import React, { useMemo, useReducer, useState } from 'react';
import {
  IonButton, IonHeader,
} from '@ionic/react';
import { Notification } from 'react-rainbow-components';
import { shuffle } from 'lodash';
import riduce from 'riduce';
import LessonContent from '../LessonContent';
import { SelectMultipleActivity } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import MultipleAnswerCard from '../../../components/atoms/MultipleAnswerCard';
import LessonToolbar from '../../../components/molecules/LessonToolbar';

interface Props {
  activity: SelectMultipleActivity
}

type Notification =
  { message?: string, isShowing: false }
    | { message: string, isShowing: true }

function LessonActivitySelectMultiple({
  activity: { blocks, answers }
}: Props) {
  const [notification, setNotification] = useState<Notification>({ isShowing: false })

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
      console.log('selecting', answer, idx)
      dispatch(actions[idx].create.assign({
        isSelected: true
      }))
    }

    if (answer.feedback) {
      setNotification({
        message: answer.feedback,
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
      {notification.isShowing && (
        <Notification
          onRequestClose={() => {
            setNotification(prevState => ({
              ...prevState,
              isShowing: false
            }))
          }}
          description={notification.message}
        />
      )}
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
      {allCorrectAnswersSelected && (
        <IonButton color='primary'>
          Continue
        </IonButton>
      )}
    </>
  )
}

export default LessonActivitySelectMultiple;