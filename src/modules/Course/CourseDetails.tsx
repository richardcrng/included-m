import React, { useContext } from 'react';
import styled from 'styled-components'
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
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
            Course Details
          </Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>VC Fundamentals</h1>
          <p>Learn about the basic fundamentals of Venture Capital - the fund structures, financial dynamics and performance metrics that sit on top of everything.</p>
          <IonCard>
            <MainCTAContent>
              <p>Ready to begin?</p>
              <p>Start learning now.</p>
              <br />
              <IonButton>Start Course</IonButton>
            </MainCTAContent>
          </IonCard>
          <IonList>
            <IonItemDivider>
              Chapter 01
            </IonItemDivider>
            <IonItem color='medium'>
              <h2>What is Venture Capital?</h2>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Lesson 1</p>
                <h2>The goals of Venture Capital</h2>
              </IonLabel>
              <LessonStartButton slot='end' expand='full' color='success'>
                >
              </LessonStartButton>
            </IonItem>
          </IonList>
          <br />
          <IonList>
            <IonItemDivider>
              Chapter 02
            </IonItemDivider>
            <IonItem color='medium'>
              <h2>Fund Structure</h2>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Lesson 1</p>
                <h2>Management Companies</h2>
              </IonLabel>
              <LessonStartButton slot='end' expand='full' color='success'>
                >
              </LessonStartButton>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Lesson 1</p>
                <h2>Management Companies</h2>
              </IonLabel>
              <LessonStartButton slot='end' expand='full' color='success'>
                >
              </LessonStartButton>
            </IonItem>
          </IonList>
        </Container>
      </IonContent>
    </>
  )
}

export default CourseDetails