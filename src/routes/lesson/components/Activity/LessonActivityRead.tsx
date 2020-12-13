import React from 'react';
import { ContentBlockRaw } from '../../../../models/ContentBlock';
import LessonContent from '../LessonContent';
import LessonContentBlock from '../LessonContentBlock';
import LessonContinueButton from '../LessonContinueButton';

interface Props {
  blocks: ContentBlockRaw[]
}

function LessonActivityRead({
  blocks
}: Props) {
  return (
    <>
      <LessonContent>
        {blocks.map(block => (
          <LessonContentBlock
            key={JSON.stringify(block)}
            block={block}
          />
        ))}
      </LessonContent>
      <LessonContinueButton />
    </>
  )
}

export default LessonActivityRead;