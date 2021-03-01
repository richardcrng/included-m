import React from "react";
import { IonButton, IonFooter } from "@ionic/react";

interface Props {
  disabled?: boolean;
  handleContinue(): void;
}

function LessonContinueButton({ disabled, handleContinue }: Props) {
  return (
    <IonFooter style={{ backgroundColor: "white" }}>
      <IonButton
        color={disabled ? "medium" : "primary"}
        disabled={disabled}
        expand="full"
        size="large"
        onClick={handleContinue}
      >
        Continue
      </IonButton>
    </IonFooter>
  );
}

export default LessonContinueButton;
