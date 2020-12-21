import React, { useContext } from "react";
import { IonButton, IonFooter } from "@ionic/react";
import { LessonContext } from "../LessonPageView";

interface Props {
  disabled?: boolean;
}

function LessonContinueButton({ disabled }: Props) {
  const {
    dispatch,
    actions,
    state: { activities, currentIdx },
  } = useContext(LessonContext);

  return (
    <IonFooter style={{ backgroundColor: "white" }}>
      <IonButton
        color={disabled ? "medium" : "primary"}
        disabled={disabled}
        expand="full"
        size="large"
        onClick={() => {
          if (currentIdx < activities.length - 1) {
            dispatch(actions.currentIdx.create.increment());
          } else {
            window.alert("You've reached the end of the demo!");
          }
        }}
      >
        Continue
      </IonButton>
    </IonFooter>
  );
}

export default LessonContinueButton;
