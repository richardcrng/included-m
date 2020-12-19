import {
  IonButton,
  IonContent,
  IonHeader,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { isEqual } from "lodash";
import { AsyncReturnType } from "type-fest";
import Lesson from "./models/Lesson";

function Test() {
  const [state, setState] = React.useState<
    AsyncReturnType<Lesson["toObjectDeep"]>
  >();

  const fetchLesson = async () => {
    const lesson = await Lesson.findById("qljKWIEvkLEw0JS1Xjjp");
    if (!state) {
      if (lesson) {
        console.log("found lesson", lesson.toObject());
        if (lesson.toObjectDeep) {
          console.log(
            "inspecting",
            typeof lesson.toObjectDeep,
            lesson.toObjectDeep
          );
          const obj = await lesson.toObjectDeep();
          setState(obj);
        }
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
                const lesson = await Lesson.createWithActivities({
                  lessonTitle: "A new lesson",
                  activities: [
                    {
                      activityType: "read",
                      blocks: ["hi there", "my lesson"],
                    },
                  ],
                });
                console.log("Created new lesson", lesson.toObject());
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
