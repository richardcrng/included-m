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
import { Chapter } from '../Lesson/lesson-types';

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

const chapters: Chapter[] = [
  {
    chapterTitle: 'What is Venture Capital?',
    lessons: [
      {
        lessonTitle: 'The goals of venture capital',
        isCompleted: true,
        activities: []
      }
    ]
  },
  {
    chapterTitle: 'Fund Structure',
    lessons: [
      {
        lessonTitle: 'Management companies',
        isCompleted: false,
        activities: []
      },
      {
        lessonTitle: 'General Partners',
        isCompleted: false,
        activities: []
      }
    ]
  }
]

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
          {chapters.map(({ chapterTitle, lessons }, chapterIdx) => (
            <>
              <IonList key={chapterTitle}>
                <IonItemDivider color='primary'>
                  Chapter {chapterIdx < 9 ? `0${chapterIdx + 1}` : chapterIdx + 1}
                </IonItemDivider>
                <IonItem color='medium'>
                  <h2>{chapterTitle}</h2>
                </IonItem>
                {lessons.map(({ lessonTitle }, lessonIdx) => (
                  <IonItem key={lessonTitle}>
                    <IonLabel>
                      <p>Lesson {lessonIdx + 1}</p>
                      <h2 className='ion-text-wrap'>
                        {lessonTitle}
                      </h2>
                    </IonLabel>
                    <LessonStartButton slot='end' expand='full' color='success'>
                      >
                    </LessonStartButton>
                  </IonItem>
                ))}
                <IonItemDivider>
                  {`${lessons.reduce((acc, { isCompleted }) => acc + Number(isCompleted), 0)} of ${lessons.length} completed`}
                </IonItemDivider>
              </IonList>
              {chapterIdx < chapters.length - 1 ? <br /> : null}
            </>
          ))}
        </Container>
      </IonContent>
    </>
  )
}

export default CourseDetails