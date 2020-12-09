import React, { useContext } from 'react';
import styled from 'styled-components'
import {
  IonButtons,
  IonToolbar,
} from '@ionic/react';
import {
  IoArrowBack,
  // IoClose,
  IoInformationCircleOutline
} from 'react-icons/io5'
import ProgressBoxes from '../../components/atoms/ProgressBoxes';

const Buttons = styled(IonButtons)`
  margin: 0 1rem;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Message = styled.p`
  margin: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`

interface Props {
  message?: string;
}

function CourseDetails() {
  return (
    <IonToolbar>
      <Buttons slot='start'>
        <IoArrowBack
          onClick={() => {
            console.log('back')
          }}
          size={24}
        />
      </Buttons>
      <Buttons slot='end'>
        <IoInformationCircleOutline
          size={24}
          onClick={() => {
            window.alert("This is a proof-of-concept for Included M. It's a work in progress!")
          }}
        />
      </Buttons>
      <Title>
        <Message>
          Course Details
        </Message>
      </Title>
    </IonToolbar>
  )
}

export default CourseDetails