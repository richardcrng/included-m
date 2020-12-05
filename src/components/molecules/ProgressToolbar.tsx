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
} from 'react-icons/io5'
import ProgressBoxes from '../atoms/ProgressBoxes';

const Buttons = styled(IonButtons)`
  margin: 1rem;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 5rem;
`

const Toolbar = styled(IonToolbar)`
  // padding: 5rem;
`

interface Props {
  currentPage: number;
  totalPages: number;
}

function ProgressToolbar({
  currentPage,
  totalPages
}: Props) {


  return (
    <IonToolbar>
      <Buttons slot='start'>
        <IoArrowBack size={24} />
      </Buttons>
      <Buttons slot='end'>
        <IoClose size={24} />
      </Buttons>
      <Title>
        <ProgressBoxes
          {...{ currentPage, totalPages }}
        />
        <div>Read and continue</div>
      </Title>
    </IonToolbar>
  )
}

export default ProgressToolbar