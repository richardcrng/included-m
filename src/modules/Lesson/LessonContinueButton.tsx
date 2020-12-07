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
    actions,
    state: { activities, currentIdx }
  } = useContext(LessonContext)

  return (
    <IonButton
      color={disabled ? 'medium' : 'primary'}
      disabled={disabled}
      expand='full'
      onClick={() => {
        if (currentIdx < activities.length - 1) {
          dispatch(actions.currentIdx.create.increment())
        } else {
          window.alert("You've reached the end of the demo!")
        }
      }}
    >
      Continue
    </IonButton>
  )
}

export default LessonContinueButton