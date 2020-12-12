import React from 'react';
import Markdown from 'markdown-to-jsx';
import {
  IonCard,
  IonCardContent
} from '@ionic/react'
import { AnswerCRUD } from '../../content/types';

interface Props {
  answer: AnswerCRUD
  onClick(): void,
  disabled?: boolean
}

function MultipleAnswerCRUDCard({
  answer: { text, isSelected, isCorrect },
  onClick,
  disabled
}: Props) {

  const color = isSelected
    ? isCorrect ? 'success' : 'warning'
    : undefined

  return (
    <IonCard
      button
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      <IonCardContent>
        <Markdown>
          {text}
        </Markdown>
      </IonCardContent>
    </IonCard>
  )
}

export default MultipleAnswerCRUDCard