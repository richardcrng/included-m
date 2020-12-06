import React from 'react';
import { ContentBlock, isSelectMultipleAnswers } from './lesson-types';
import MultipleAnswerCard from '../../components/atoms/MultipleAnswerCard';

interface Props {
  block: ContentBlock
}

function LessonContentBlock({
  block
}: Props) {
  if (isSelectMultipleAnswers(block)) {
    return (
      <div key={JSON.stringify(block)}>
        {block.answers.map(answer => (
          <MultipleAnswerCard
            key={answer.text}
            text={answer.text}
          />
        ))}
      </div>
    )
  } else {
    return (
      <p key={JSON.stringify(block)}>{block}</p>
    )
  }
}

export default LessonContentBlock