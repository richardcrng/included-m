import React, { useContext } from 'react'
import { IonButton } from '@ionic/react'
import { LessonContext } from './Lesson'

interface Props {
  disabled?: boolean
}

function LessonContinueButton({
  disabled
}: Props) {
  const {
    dispatch,
    actions
  } = useContext(LessonContext)

  return (
    <IonButton
      color={disabled ? 'medium' : 'primary'}
      disabled={disabled}
      expand='full'
      onClick={() => {
        dispatch(actions.currentIdx.create.increment())
      }}
    >
      Continue
    </IonButton>
  )
}

export default LessonContinueButton