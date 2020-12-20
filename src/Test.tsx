import { IonButton, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import React from "react";
import { AsyncReturnType } from "type-fest";
import Lesson from "./models/Lesson";
import Course, { CourseWithTopics } from "./models/Course";
import { sampleContent } from "./models/test/sample-content";

function Test() {
  const [state, setState] = React.useState<
    AsyncReturnType<Lesson["toObjectDeep"]>
  >();

  const fetchLesson = async () => {
    const lesson = await Lesson.findById("qljKWIEvkLEw0JS1Xjjp");
    if (!state) {
      if (lesson) {
        const obj = await lesson.toObjectDeep();
        setState(obj);
      }
    }
  };

  React.useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return (
    <>
      <IonToolbar>
        <IonHeader>{state ? "Data found" : "Searching for data"}</IonHeader>
      </IonToolbar>
      <IonContent>
        <div style={{ margin: "1rem" }}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
          <IonButton
            onClick={async () => {
              const course = await Course.createWithTopics(
                sampleContent as CourseWithTopics
              );
              const obj = await course.toObjectDeep();
              console.log("Created course", obj);
            }}
          >
            Create Course
          </IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default Test;
