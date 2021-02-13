import React from "react";
import styled from "styled-components";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router";
import { DEFAULT_COURSE_ID } from "../../../constants";
import SignOutIcon from "../../ui/atoms/SignOutIcon";
import { TopicYamlRecursive } from "../../../content/types/content-yaml.types";
import TopicChapterItem from "./TopicChapterItem";

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
  onLessonSelect(lesson: LessonData, chapter: ChapterData): void;
}

function TopicPageView({ topic, onLessonSelect }: Props) {
  const history = useHistory();

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
                    onClick={() =>
                      // start first chapter first lesson
                      onLessonSelect(
                        topic.chapters[0].lessons[0],
                        topic.chapters[0]
                      )
                    }
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
            <TopicChapterItem
              key={chapter.id}
              chapter={chapter}
              chapterIdx={chapterIdx}
              topic={topic}
              onLessonSelect={onLessonSelect}
            />
          ))}
        </Container>
      </IonContent>
    </>
  );
}

export default TopicPageView;
