import React from 'react';
import LessonContent from '../LessonContent';
import { ContentBlock } from '../../../courseData/types';
import LessonContentBlock from '../LessonContentBlock';
import LessonContinueButton from '../LessonContinueButton';

interface Props {
  blocks: ContentBlock[]
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