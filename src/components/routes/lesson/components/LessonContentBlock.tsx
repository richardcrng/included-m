import React from "react";
import Markdown from "markdown-to-jsx";
import { BlockBase } from "../../../../lib/models/Activity";

interface Props {
  block: string | BlockBase;
}

function LessonContentBlock({ block }: Props) {
  if (typeof block !== "string") {
    return <Markdown options={{ forceBlock: true }}>{block.markdown}</Markdown>;
  } else {
    return <Markdown options={{ forceBlock: true }}>{block}</Markdown>;
  }
}

export default LessonContentBlock;
