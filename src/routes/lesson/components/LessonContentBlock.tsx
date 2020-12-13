import React from 'react';
import Markdown from 'markdown-to-jsx';
import { ContentBlockRaw } from '../../../models/ContentBlock';

interface Props {
  block: ContentBlockRaw
}

function LessonContentBlock({
  block
}: Props) {
  if (typeof block !== 'string') {
    return (
      <Markdown options={{ forceBlock: true }}>
        {block.markdown}
      </Markdown>
    )
  } else {
    return (
      <Markdown options={{ forceBlock: true }}>
        {block}
      </Markdown>
    )
  }
  
}

export default LessonContentBlock