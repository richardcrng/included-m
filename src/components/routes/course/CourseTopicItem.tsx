import styled from "styled-components";
import { IonButton, IonItem, IonLabel } from "@ionic/react";
import {
  hasChildContent,
  TopicYaml,
} from "../../../content/types/content-yaml.types";

const PickCourseButton = styled(IonButton)`
  height: 100%;
`;

interface Props {
  topic: TopicYaml;
  onTopicStart(topic: TopicYaml): void;
}

function CourseTopicItem({ topic, onTopicStart }: Props) {
  return (
    <IonItem disabled={!hasChildContent(topic)}>
      <IonLabel>
        <h2 className="ion-text-wrap">
          <b>{topic.topicTitle}</b>
          {!hasChildContent(topic) && <span> 🚧 </span>}
        </h2>
        <p className="ion-text-wrap">{topic.description}</p>
      </IonLabel>
      <PickCourseButton
        slot="end"
        expand="full"
        color="success"
        onClick={() => onTopicStart(topic)}
      >
        {">"}
      </PickCourseButton>
    </IonItem>
  );
}

export default CourseTopicItem;
