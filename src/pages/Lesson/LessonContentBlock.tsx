import React from 'react';
import Markdown from 'markdown-to-jsx';
import { ContentBlockCRUD } from '../../content/types';

interface Props {
  block: ContentBlockCRUD
}

function LessonCRUD({
  block
}: Props) {
  if (typeof block !== 'string') {
    // TODO handle non-string block
    return null
  } else {
    return (
      <Markdown options={{ forceBlock: true }}>
        {block}
      </Markdown>
    )
  }
  
}

export default LessonCRUD