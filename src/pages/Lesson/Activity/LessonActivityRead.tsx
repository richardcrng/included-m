import React from 'react';
import LessonContent from '../LessonContent';
import { ContentBlockCRUD } from '../../../content/types';
import LessonContentBlock from '../LessonContentBlock';
import LessonContinueButton from '../LessonContinueButton';

interface Props {
  blocks: ContentBlockCRUD[]
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