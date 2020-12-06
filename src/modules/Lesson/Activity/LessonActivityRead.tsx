import React from 'react';
import {
  IonButton,
} from '@ionic/react';
import LessonContent from '../LessonContent';
import { ContentBlock } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';

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
      <IonButton color='success'>
        Continue
      </IonButton>
    </>
  )
}

export default LessonActivityRead;