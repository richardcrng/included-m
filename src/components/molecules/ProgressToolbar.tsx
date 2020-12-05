import React from 'react';
import styled from 'styled-components'
import {
  IonApp,
  IonButton,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle
} from '@ionic/react';
import {
  IoArrowBack,
  IoClose,
  IoCheckboxSharp,
  IoSquare,
  IoSquareOutline,
  IoCheckboxOutline
} from 'react-icons/io5'

const Buttons = styled(IonButtons)`
  margin: 1rem;
`

const Title = styled(IonTitle)`
  height: 5rem;
`

interface Props {
  currentPage: number;
  totalPages: number;
}

function ProgressToolbar({
  currentPage,
  totalPages
}: Props) {

  const iconSize = 24
  const checkboxes = Array.from(Array(totalPages).keys()).map(idx => {
    const Icon = idx < currentPage
      ? IoCheckboxSharp
      : idx === currentPage
        ? IoSquare
        : IoSquareOutline
    
    return <Icon size={iconSize} />
  })


  return (
    <IonToolbar>
      <Buttons slot='start'>
        <IoArrowBack size={24} />
      </Buttons>
      <Buttons slot='end'>
        <IoClose size={24} />
      </Buttons>
      <Title>
        <div>
          {checkboxes}
        </div>
        <div>Read and continue</div>
      </Title>
    </IonToolbar>
  )
}

export default ProgressToolbar