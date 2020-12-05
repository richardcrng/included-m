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
  IoSquareOutline
} from 'react-icons/io5'

const Buttons = styled(IonButtons)`
  margin: 1rem;
`

const Title = styled(IonTitle)`
  height: 5rem;
`

function ProgressToolbar() {
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
          <IoCheckboxSharp size={18} />
          <IoCheckboxSharp size={18} />
          <IoCheckboxSharp size={18} />
          <IoSquare size={18} />
          <IoSquareOutline size={18} />
          <IoSquareOutline size={18} />
          <IoSquareOutline size={18} />
        </div>
        <div>Read and continue</div>
      </Title>
    </IonToolbar>
  )
}

export default ProgressToolbar