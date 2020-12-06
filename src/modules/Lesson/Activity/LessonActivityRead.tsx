import React from 'react';
import LessonContent from '../LessonContent';
import { ContentBlock } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import LessonContinueButton from '../../LessonContinueButton';
import LessonHeader from '../LessonHeader';

interface Props {
  blocks: ContentBlock[]
}

function LessonActivityRead({
  blocks
}: Props) {
  return (
    <>
      <LessonHeader />
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