import React from "react";
import styled from "styled-components";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonLabel,
  IonToolbar,
} from "@ionic/react";
import { IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router";
import SignOutIcon from "../../ui/atoms/SignOutIcon";
import { CourseYamlDeep } from "../../content/types/content-yaml.types";

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

const PickCourseButton = styled(IonButton)`
  height: 100%;
`;

type CourseData = CourseYamlDeep;

interface Props {
  course: CourseData;
  onTopicStart?(topic: CourseData["topics"][0]): void;
}

function CoursePageView({ course, onTopicStart }: Props) {
  const history = useHistory();

  return (
    <>
      <IonToolbar>
        <Buttons slot="start">
          <IoArrowBack
            onClick={() => {
              history.push("/learn");
            }}
            size={24}
          />
        </Buttons>
        <Buttons slot="end">
          <SignOutIcon />
        </Buttons>
        <Title>
          <Message>Included M</Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>{course.courseTitle}</h1>
          <p>{course.description}</p>
          {course.topics.map((topic, idx) => (
            <React.Fragment key={topic.topicTitle}>
              <IonItem>
                <IonLabel>
                  <h2 className="ion-text-wrap">
                    <b>{topic.topicTitle}</b>
                  </h2>
                  <p className="ion-text-wrap">{topic.description}</p>
                </IonLabel>
                <PickCourseButton
                  slot="end"
                  expand="full"
                  color="success"
                  onClick={() => onTopicStart && onTopicStart(topic)}
                >
                  {">"}
                </PickCourseButton>
              </IonItem>
              {idx < course.topics.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </Container>
      </IonContent>
    </>
  );
}

export default CoursePageView;
