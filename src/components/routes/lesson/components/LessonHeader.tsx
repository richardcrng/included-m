import { IonHeader } from "@ionic/react";
import React from "react";
import LessonToolbar from "./LessonToolbar";

interface Props {
  currentPage: number;
  totalPages: number;
  handleBack(): void;
  handleExit(): void;
  message?: string;
}

export default function LessonHeader({
  currentPage,
  totalPages,
  handleBack,
  handleExit,
  message,
}: Props) {
  return (
    <IonHeader>
      <LessonToolbar
        {...{
          currentPage,
          totalPages,
          handleBack,
          handleExit,
          message,
        }}
      />
    </IonHeader>
  );
}
