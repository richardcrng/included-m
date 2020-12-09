import React from 'react';
import styled from 'styled-components'
import {
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
import vcFundamentals from '../../content/01-vc-fundamentals';
import { Topic } from '../../content/types';

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

const topic = vcFundamentals

interface Props {
  topic: Topic
}

function TopicDetails({ topic }: Props) {
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
            Topic Details
          </Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>{topic.topicTitle}</h1>
          <p>{topic.description}</p>
          <IonCard>
            <MainCTAContent>
              <p>Ready to begin?</p>
              <p>Start learning now.</p>
              <br />
              <IonButton>Start Topic</IonButton>
            </MainCTAContent>
          </IonCard>
          {topic.chapters.map(({ chapterTitle, lessons }, chapterIdx) => (
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
                      {'>'}
                    </LessonStartButton>
                  </IonItem>
                ))}
                <IonItemDivider>
                  {`${lessons.reduce((acc, { isCompleted }) => acc + Number(!!isCompleted), 0)} of ${lessons.length} completed`}
                </IonItemDivider>
              </IonList>
              {chapterIdx < topic.chapters.length - 1 ? <br /> : null}
            </>
          ))}
        </Container>
      </IonContent>
    </>
  )
}

export default TopicDetails