import React from 'react';
import Markdown from 'markdown-to-jsx';
import { ContentBlock } from '../../content/types';

interface Props {
  block: ContentBlock
}

function LessonContentBlock({
  block
}: Props) {
  return (
    <Markdown options={{ forceBlock: true }}>{block}</Markdown>
  )
}

export default LessonContentBlock