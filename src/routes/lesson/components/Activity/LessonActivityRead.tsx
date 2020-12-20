import React from "react";
import { BlockBase } from "../../../../models/Activity";
import LessonContent from "../LessonContent";
import LessonContentBlock from "../LessonContentBlock";
import LessonContinueButton from "../LessonContinueButton";

interface Props {
  blocks: BlockBase[];
}

function LessonActivityRead({ blocks }: Props) {
  return (
    <>
      <LessonContent>
        {blocks.map((block) => (
          <LessonContentBlock key={JSON.stringify(block)} block={block} />
        ))}
      </LessonContent>
      <LessonContinueButton />
    </>
  );
}

export default LessonActivityRead;
