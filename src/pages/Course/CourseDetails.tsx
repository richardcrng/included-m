import React from 'react';
import styled from 'styled-components'
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonToolbar,
} from '@ionic/react';
import {
  IoArrowBack,
  IoInformationCircleOutline
} from 'react-icons/io5'
import { Chapter } from '../../content/types';
import vcFundamentals from '../../content/01-vc-fundamentals/chapters';

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

const MainCTAContent = styled(IonCardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.15rem;
  }

  ion-button {
    width: 100%
  }
`

const LessonStartButton = styled(IonButton)`
  height: 100%
`

interface Props {
  message?: string;
}

const chapters: Chapter[] = vcFundamentals

function CourseDetails() {
  return (
    <>
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
            Included M
          </Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>Included M</h1>
          <p>Included M is a free learning pathway in venture capital, brought to you by Included VC.</p>
          <IonItem>
            <IonLabel>
              <h2 className='ion-text-wrap'>
                <b>Fundamentals of Venture Capital</b>
              </h2>
              <p className='ion-text-wrap'>Learn about the the fund structures, financial dynamics and performance metrics in VC.</p>
            </IonLabel>
            <LessonStartButton slot='end' expand='full' color='success'>
              {'>'}
            </LessonStartButton>
          </IonItem>
          <br />
          <IonItem>
            <IonLabel>
              <h2 className='ion-text-wrap'>
                <b>Dealflow: Sourcing</b>
              </h2>
              <p className='ion-text-wrap'>Discover what dealflow is, where it comes from and what the different models of it are.</p>
            </IonLabel>
            <LessonStartButton slot='end' expand='full' color='success'>
              {'>'}
            </LessonStartButton>
          </IonItem>
        </Container>
      </IonContent>
    </>
  )
}

export default CourseDetails