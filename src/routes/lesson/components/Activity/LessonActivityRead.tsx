import React from "react";
import LessonContent from "../LessonContent";
import LessonContentBlock from "../LessonContentBlock";
import LessonContinueButton from "../LessonContinueButton";
import { ReadActivityJSON } from "../../../../content/content-types";

interface Props {
  activity: ReadActivityJSON;
}

function LessonActivityRead({ activity }: Props) {
  return (
    <>
      <LessonContent>
        {activity.blocks.map((block) => (
          <LessonContentBlock key={JSON.stringify(block)} block={block} />
        ))}
      </LessonContent>
      <LessonContinueButton />
    </>
  );
}

export default LessonActivityRead;
