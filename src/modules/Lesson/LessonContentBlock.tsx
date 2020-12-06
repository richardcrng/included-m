import React from 'react';
import { ContentBlock } from './lesson-types';

interface Props {
  block: ContentBlock
}

function LessonContentBlock({
  block
}: Props) {
  // if (isSelectMultipleAnswers(block)) {
  //   return (
  //     <div key={JSON.stringify(block)}>
  //       {block.answers.map(answer => (
  //         <MultipleAnswerCard
  //           key={answer.text}
  //           text={answer.text}
  //         />
  //       ))}
  //     </div>
  //   )
  // } else {
    return (
      <p key={JSON.stringify(block)}>{block}</p>
    )
  // }
}

export default LessonContentBlock