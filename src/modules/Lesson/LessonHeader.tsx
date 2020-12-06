import { IonHeader } from '@ionic/react'
import React from 'react'
import LessonToolbar from '../../components/molecules/LessonToolbar'

interface Props {
  currentPage: number;
  totalPages: number;
  message?: string
}

export default function LessonHeader({
  currentPage, totalPages, message
}: Props) {
  return (
    <IonHeader>
      <LessonToolbar
        {...{
          currentPage,
          totalPages,
          message
        }}
      />
    </IonHeader>
  )
}