import React from 'react';
import styled from 'styled-components'
import {
  IonButtons,
  IonToolbar,
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
`

const Message = styled.p`
  margin: 0.5rem 0 0 0;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
`

interface Props {
  currentPage: number;
  totalPages: number;
  message?: string;
}

function LessonToolbar({
  currentPage,
  totalPages,
  message
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
        <Message>{message ? message : 'Read and continue'}</Message>
      </Title>
    </IonToolbar>
  )
}

export default LessonToolbar