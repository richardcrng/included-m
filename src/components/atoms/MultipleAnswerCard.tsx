import React from 'react';
import {
  IonCard,
  IonCardContent
} from '@ionic/react'
import { SelectMultipleAnswer } from '../../modules/Lesson/lesson-types';

interface Props {
  answer: SelectMultipleAnswer
  onClick(): void
}

function MultipleAnswerCard({
  answer: { text, isSelected, isCorrect },
  onClick
}: Props) {

  const color = isSelected
    ? isCorrect ? 'success' : 'warning'
    : undefined

  return (
    <IonCard
      button
      color={color}
      onClick={onClick}
    >
      <IonCardContent>{text}</IonCardContent>
    </IonCard>
  )
}

export default MultipleAnswerCard