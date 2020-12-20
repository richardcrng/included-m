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
import { IoArrowBack, IoInformationCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router";
import { CourseRawDeep } from "../../models/Course.old";
import { TopicRaw, TopicRawDeep } from "../../models/Topic.old";
import Course from "../../models/Course";
import { AsyncReturnType } from "type-fest";

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
interface Props {
  course: AsyncReturnType<Course["toObjectDeep"]>;
  onTopicStart?(topic: any): void;
}

function CoursePageView({ course, onTopicStart }: Props) {
  const history = useHistory();

  return (
    <>
      <IonToolbar>
        <Buttons slot="start">
          <IoArrowBack
            onClick={() => {
              history.push("/");
            }}
            size={24}
          />
        </Buttons>
        <Buttons slot="end">
          <IoInformationCircleOutline
            size={24}
            onClick={() => {
              window.alert(
                "This is a proof-of-concept for Included M. It's a work in progress!"
              );
            }}
          />
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
