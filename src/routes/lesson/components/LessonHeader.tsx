import { IonHeader } from '@ionic/react'
import React from 'react'
import LessonToolbar from './LessonToolbar'

interface Props {
  message?: string
}

export default function LessonHeader({
  message
}: Props) {
  return (
    <IonHeader>
      <LessonToolbar
        {...{
          message
        }}
      />
    </IonHeader>
  )
}