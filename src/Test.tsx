import { IonButton, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import React from "react";
import { AsyncReturnType } from "type-fest";
import Lesson from "./models/Lesson";
import Chapter from "./models/Chapter";

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

  if (!state) {
    return <div>Looking for data...</div>;
  } else {
    return (
      <>
        <IonToolbar>
          <IonHeader>Data found</IonHeader>
        </IonToolbar>
        <IonContent>
          <div style={{ margin: "1rem" }}>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <IonButton
              onClick={async () => {
                const chapter = await Chapter.createWithLessons({
                  chapterTitle: "A chapter",
                  lessons: [
                    {
                      lessonTitle: "Lesson 0 from a chapter",
                      activities: [
                        {
                          activityType: "read",
                          blocks: ["Hello world"],
                        },
                      ],
                    },
                    {
                      lessonTitle: "Lesson 1 from a chapter",
                      activities: [
                        {
                          activityType: "read",
                          blocks: ["Me again"],
                        },
                      ],
                    },
                  ],
                });
                const chapterObj = await chapter.toObjectDeep();
                console.log("Created chapter", chapterObj);
              }}
            >
              Create Lesson
            </IonButton>
          </div>
        </IonContent>
      </>
    );
  }
}

export default Test;
