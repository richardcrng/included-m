import React from "react";
import styled from "styled-components";
import { capitalCase } from "change-case";
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
} from "@ionic/react";
import { IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router";
import { DEFAULT_COURSE_ID } from "../../constants";
import SignOutIcon from "../../ui/atoms/SignOutIcon";
import { TopicYamlRecursive } from "../../content/types/content-yaml.types";

const Buttons = styled(IonButtons)`
  margin: 0 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  margin: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

const Container = styled.div`
  margin: 1rem;
`;

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
    width: 100%;
  }
`;

const LessonStartButton = styled(IonButton)`
  height: 100%;
`;

type TopicData = TopicYamlRecursive;
type ChapterData = TopicData["chapters"][0];
type LessonData = ChapterData["lessons"][0];

interface Props {
  topic: TopicData;
  onLessonSelect?(lesson: LessonData, chapter: ChapterData): void;
}

function TopicPageView({ topic, onLessonSelect }: Props) {
  const history = useHistory();

  const createLessonSelectHandler = (
    lesson: LessonData,
    chapter: ChapterData
  ) => () => onLessonSelect && onLessonSelect(lesson, chapter);

  return (
    <>
      <IonToolbar>
        <Buttons slot="start">
          <IoArrowBack
            onClick={() => {
              history.goBack();
            }}
            size={24}
          />
        </Buttons>
        <Buttons slot="end">
          <SignOutIcon />
        </Buttons>
        <Title>
          <Message>Topic Details</Message>
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
                  <IonButton
                    onClick={createLessonSelectHandler(
                      topic.chapters[0].lessons[0],
                      topic.chapters[0]
                    )}
                  >
                    Start Topic
                  </IonButton>
                </>
              ) : (
                <>
                  <p>
                    <b>Oops...!</b>
                  </p>
                  <p>
                    This topic is under construction. Why don't you try another?
                  </p>
                  <IonButton routerLink={`/learn/${DEFAULT_COURSE_ID}`}>
                    Choose another
                  </IonButton>
                </>
              )}
            </MainCTAContent>
          </IonCard>
          {topic.chapters.map((chapter, chapterIdx) => (
            <React.Fragment key={chapter.chapterTitle}>
              <IonList>
                <IonItemDivider color="primary">
                  Chapter{" "}
                  {chapterIdx < 9 ? `0${chapterIdx + 1}` : chapterIdx + 1}
                </IonItemDivider>
                <IonItem color="medium">
                  <h2>{chapter.chapterTitle}</h2>
                </IonItem>
                {chapter.lessons.map((lesson, lessonIdx) => (
                  <IonItem
                    // in case of duplicate lessons between titles
                    key={`${chapter.chapterTitle} // ${
                      lesson.lessonTitle ?? lessonIdx
                    }`}
                  >
                    <IonLabel>
                      <p>Lesson {lessonIdx + 1}</p>
                      <h2 className="ion-text-wrap">
                        {lesson.lessonTitle ?? capitalCase(lesson.id)}
                      </h2>
                    </IonLabel>
                    <LessonStartButton
                      slot="end"
                      expand="full"
                      color="success"
                      onClick={createLessonSelectHandler(lesson, chapter)}
                    >
                      {">"}
                    </LessonStartButton>
                  </IonItem>
                ))}
                {/* <IonItemDivider>
                  {`${lessons.reduce((acc, { isCompleted }) => acc + Number(!!isCompleted), 0)} of ${lessons.length} completed`}
                </IonItemDivider> */}
              </IonList>
              {chapterIdx < topic.chapters.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </Container>
      </IonContent>
    </>
  );
}

export default TopicPageView;
