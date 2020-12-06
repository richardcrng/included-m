import React from 'react';
import {
  IonCard,
  IonCardContent
} from '@ionic/react'
import { SelectAnswer } from '../../modules/Lesson/lesson-types';

interface Props {
  answer: SelectAnswer
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
      {/* <IonCardHeader>
        <IonCheckbox />
      </IonCardHeader> */}
      <IonCardContent>{text}</IonCardContent>
    </IonCard>
  )
}

export default MultipleAnswerCard