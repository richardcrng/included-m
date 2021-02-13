import {
  IonButton,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
} from "@ionic/react";
import { capitalCase } from "change-case";
import styled from "styled-components";
import {
  ChapterYamlDeep,
  TopicYamlRecursive,
} from "../../../content/types/content-yaml.types";

const LessonStartButton = styled(IonButton)`
  height: 100%;
`;

interface Props {
  topic: TopicYamlRecursive;
  chapter: ChapterYamlDeep;
  chapterIdx: number;
  onLessonSelect(
    lesson: ChapterYamlDeep["lessons"][0],
    chapter: ChapterYamlDeep
  ): void;
}

function TopicChapterItem({
  chapter,
  chapterIdx,
  onLessonSelect,
  topic,
}: Props) {
  return (
    <>
      <IonList>
        <IonItemDivider color="primary">
          Chapter {chapterIdx < 9 ? `0${chapterIdx + 1}` : chapterIdx + 1}
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
              onClick={() => onLessonSelect(lesson, chapter)}
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
    </>
  );
}

export default TopicChapterItem;
