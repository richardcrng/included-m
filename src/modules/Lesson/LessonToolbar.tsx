import React, { useContext } from 'react';
import styled from 'styled-components'
import {
  IonButtons,
  IonToolbar,
} from '@ionic/react';
import {
  IoArrowBack,
  IoClose,
} from 'react-icons/io5'
import ProgressBoxes from '../../components/atoms/ProgressBoxes';
import { LessonContext } from './Lesson';

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
  message?: string;
}

function LessonToolbar({
  message
}: Props) {

  const { state: { activities, currentIdx } } = useContext(LessonContext)

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
          currentPage={currentIdx}
          totalPages={activities.length}
        />
        <Message>{message ? message : 'Read and continue'}</Message>
      </Title>
    </IonToolbar>
  )
}

export default LessonToolbar