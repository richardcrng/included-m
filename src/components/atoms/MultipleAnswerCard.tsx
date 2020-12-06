import React from 'react';
import {
  IonCard,
  IonCardContent
} from '@ionic/react'

interface Props {
  text: string
}

function MultipleAnswerCard({
  text
}: Props) {
  return (
    <IonCard button>
      {/* <IonCardHeader>
        <IonCheckbox />
      </IonCardHeader> */}
      <IonCardContent>{text}</IonCardContent>
    </IonCard>
  )
}

export default MultipleAnswerCard