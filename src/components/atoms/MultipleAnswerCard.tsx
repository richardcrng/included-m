import React from 'react';
import {
  IonCard,
  IonCardContent
} from '@ionic/react'
import { SelectAnswer } from '../../modules/Lesson/lesson-types';

interface Props {
  answer: SelectAnswer
}

function MultipleAnswerCard({
  answer: { text, selected, isCorrect }
}: Props) {

  const color = selected
    ? isCorrect ? 'success' : 'warning'
    : undefined

  return (
    <IonCard button color={color}>
      {/* <IonCardHeader>
        <IonCheckbox />
      </IonCardHeader> */}
      <IonCardContent>{text}</IonCardContent>
    </IonCard>
  )
}

export default MultipleAnswerCard