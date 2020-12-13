import React from 'react';
import styled from 'styled-components'
import {
  IonButtons,
  IonCardContent,
  IonContent,
  IonToolbar,
} from '@ionic/react';
import {
  IoArrowBack,
  IoInformationCircleOutline
} from 'react-icons/io5'
import { useHistory } from 'react-router';

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

const Container = styled.div`
  margin: 1rem;
`

function LoadingPage() {

  const history = useHistory()

  return (
    <>
      <IonToolbar>
        <Buttons slot='start'>
          <IoArrowBack
            onClick={() => {
              history.goBack()
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
            Loading...
          </Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>Loading from database...</h1>
        </Container>
      </IonContent>
    </>
  )
}

export default LoadingPage