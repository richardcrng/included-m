import { IonButton } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { ActivityJSON } from "../../../../../content/types/content-yaml.types";
import LessonContent from "../LessonContent";
import LessonActivityRead from "./LessonActivityRead";
import LessonActivitySelectMultiple from "./LessonActivitySelectMultiple";
import LessonActivitySelectForEachBlank from "./SelectForEachBlank";
import LessonActivitySelectForEachBlankComplex from "./SelectForEachBlank/LessonActivitySelectForEachBlankComplex";
import LessonActivitySwipeCards from "./SwipeCards";

interface Props {
  activity: ActivityJSON;
}

function LessonActivity({ activity }: Props) {
  const history = useHistory();

  if (!activity) {
    return (
      <>
        <LessonContent>
          <h1>Under construction...!</h1>
          <p>This lesson is still under construction.</p>
          <p>Why don't you try another?</p>
          <IonButton
            onClick={() => {
              history.goBack();
            }}
            expand="full"
          >
            Go back
          </IonButton>
        </LessonContent>
      </>
    );
  } else if (activity.activityType === "select-one") {
    return <LessonActivitySelectMultiple activity={activity} />;
  } else if (activity.activityType === "select-multiple") {
    return <LessonActivitySelectMultiple activity={activity} />;
  } else if (activity.activityType === "select-for-each-blank") {
    if (Object.keys(activity.choices || {}).length > 0) {
      return <LessonActivitySelectForEachBlankComplex activity={activity} />;
    } else {
      return <LessonActivitySelectForEachBlank activity={activity} />;
    }
  } else if (activity.activityType === "swipe-cards") {
    return <LessonActivitySwipeCards activity={activity} />;
  } else if (activity.activityType === "read") {
    return <LessonActivityRead activity={activity} />;
  } else {
    return null;
  }
}

export default LessonActivity;
