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
import { Lesson, Topic } from '../../content/types';
import { RouteChildrenProps, RouteComponentProps, useHistory } from 'react-router';

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
  text-align: center;

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


interface Props {
  topic: Topic,
  onLessonSelect?(lesson: Lesson): void
}

function TopicDetails({
  topic,
  onLessonSelect
}: Props) {

  const history = useHistory()

  const createLessonSelectHandler = (lesson: Lesson) => () => onLessonSelect && onLessonSelect(lesson)

  return (
    <>
      <IonToolbar>
        <Buttons slot='start'>
          <IoArrowBack
            onClick={() => {
              history.push('/course')
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
              {topic.chapters.length > 0 ? (
                <>
                  <p>Ready to begin?</p>
                  <p>Start learning now.</p>
                  <br />
                  <IonButton>Start Topic</IonButton>
                </>
              ) : (
                <>
                  <p><b>Oops...!</b></p>
                  <p>This topic is under construction. Why don't you try another?</p>
                  <IonButton routerLink='/course'>Choose another</IonButton>
                </>
              )}
            </MainCTAContent>
          </IonCard>
          {topic.chapters.map(({ chapterTitle, lessons }, chapterIdx) => (
            <React.Fragment key={chapterTitle}>
              <IonList>
                <IonItemDivider color='primary'>
                  Chapter {chapterIdx < 9 ? `0${chapterIdx + 1}` : chapterIdx + 1}
                </IonItemDivider>
                <IonItem color='medium'>
                  <h2>{chapterTitle}</h2>
                </IonItem>
                {lessons.map((lesson, lessonIdx) => (
                  <IonItem key={lesson.lessonTitle}>
                    <IonLabel>
                      <p>Lesson {lessonIdx + 1}</p>
                      <h2 className='ion-text-wrap'>
                        {lesson.lessonTitle}
                      </h2>
                    </IonLabel>
                    <LessonStartButton
                      slot='end'
                      expand='full' color='success'
                      onClick={createLessonSelectHandler(lesson)}
                    >
                      {'>'}
                    </LessonStartButton>
                  </IonItem>
                ))}
                <IonItemDivider>
                  {`${lessons.reduce((acc, { isCompleted }) => acc + Number(!!isCompleted), 0)} of ${lessons.length} completed`}
                </IonItemDivider>
              </IonList>
              {chapterIdx < topic.chapters.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </Container>
      </IonContent>
    </>
  )
}

export default TopicDetails