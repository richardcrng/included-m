import React from "react";
import LessonContent from "../../LessonContent";
import LessonContentBlock from "../../LessonContentBlock";
import LessonContinueButton from "../../LessonContinueButton";
import { ReadActivityJSON } from "../../../../../../content/types/content-yaml.types";

interface Props {
  activity: ReadActivityJSON;
  handleContinue(): void;
}

function LessonActivityRead({ activity, handleContinue }: Props) {
  return (
    <>
      <LessonContent>
        {activity.blocks.map((block) => (
          <LessonContentBlock key={JSON.stringify(block)} block={block} />
        ))}
      </LessonContent>
      <LessonContinueButton handleContinue={handleContinue} />
    </>
  );
}

export default LessonActivityRead;
