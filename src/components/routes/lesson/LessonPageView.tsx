import React from "react";
import LessonActivity from "./components/Activity/LessonActivity";
import LessonToolbar from "./components/LessonToolbar";
import ActivityPageView from "./ActivityPageView";
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

function LessonPageView({
  activity,
  currentPage,
  handleBack,
  handleContinue,
  handleExit,
  totalPages,
}: Props) {
  return null;
}

export default LessonPageView;
