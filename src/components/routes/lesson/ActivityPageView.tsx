import React from "react";
import LessonActivity from "./components/LessonActivity";
import LessonToolbar from "./components/LessonToolbar";
import {
  ActivityJSON,
  LessonYaml,
} from "../../../content/types/content-yaml.types";

type LessonData = LessonYaml;

interface Props {
  activity: ActivityJSON;
  currentPage: number;
  handleBack(): void;
  handleContinue(): void;
  handleExit(): void;
  lesson: LessonData;
  totalPages: number;
}

function ActivityPageView({
  activity,
  currentPage,
  handleBack,
  handleContinue,
  handleExit,
  totalPages,
}: Props) {
  return (
    <>
      <LessonToolbar
        {...{ handleBack, handleContinue, handleExit, currentPage, totalPages }}
      />
      <LessonActivity activity={activity} handleContinue={handleContinue} />
    </>
  );
}

export default ActivityPageView;
