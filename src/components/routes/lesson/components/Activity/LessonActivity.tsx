import { IonButton } from "@ionic/react";
import React from "react";
import { ActivityJSON } from "../../../../../content/types/content-yaml.types";
import LessonContent from "../LessonContent";
import LessonActivityRead from "./LessonActivityRead";
import LessonActivitySelectMultiple from "./LessonActivitySelectMultiple";
import LessonActivitySelectForEachBlank from "./SelectForEachBlank";
import LessonActivitySelectForEachBlankComplex from "./SelectForEachBlank/LessonActivitySelectForEachBlankComplex";
import LessonActivitySwipeCards from "./SwipeCards";

interface Props {
  activity: ActivityJSON;
  handleBack?(): void;
  handleContinue(): void;
}

function LessonActivity({ activity, handleBack, handleContinue }: Props) {
  if (!activity) {
    return (
      <>
        <LessonContent>
          <h1>Under construction...!</h1>
          <p>This lesson is still under construction.</p>
          <p>Why don't you try another?</p>
          <IonButton onClick={handleBack} expand="full">
            Go back
          </IonButton>
        </LessonContent>
      </>
    );
  } else if (activity.activityType === "select-an-answer") {
    return (
      <LessonActivitySelectMultiple
        activity={activity}
        handleContinue={handleContinue}
      />
    );
  } else if (activity.activityType === "select-multiple") {
    return (
      <LessonActivitySelectMultiple
        activity={activity}
        handleContinue={handleContinue}
      />
    );
  } else if (activity.activityType === "select-for-each-blank") {
    if (Object.keys(activity.choices || {}).length > 0) {
      return (
        <LessonActivitySelectForEachBlankComplex
          activity={activity}
          handleContinue={handleContinue}
        />
      );
    } else {
      return (
        <LessonActivitySelectForEachBlank
          activity={activity}
          handleContinue={handleContinue}
        />
      );
    }
  } else if (activity.activityType === "swipe-cards") {
    return (
      <LessonActivitySwipeCards
        activity={activity}
        handleContinue={handleContinue}
      />
    );
  } else if (activity.activityType === "read") {
    return (
      <LessonActivityRead activity={activity} handleContinue={handleContinue} />
    );
  } else {
    return null;
  }
}

export default LessonActivity;
