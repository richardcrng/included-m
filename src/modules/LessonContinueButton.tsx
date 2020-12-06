import { IonButton } from '@ionic/react'
import React from 'react'

interface Props {
  disabled?: boolean
}

function LessonContinueButton({
  disabled
}: Props) {
  return (
    <IonButton
      color={disabled ? 'medium' : 'primary'}
      disabled={disabled}
      expand='full'
    >
      Continue
    </IonButton>
  )
}

export default LessonContinueButton