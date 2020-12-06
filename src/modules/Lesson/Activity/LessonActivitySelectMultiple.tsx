import React from 'react';
import {
  IonButton,
} from '@ionic/react';
import LessonContent from '../LessonContent';
import { SelectMultipleActivity } from '../lesson-types';
import LessonContentBlock from '../LessonContentBlock';
import MultipleAnswerCard from '../../../components/atoms/MultipleAnswerCard';

interface Props {
  activity: SelectMultipleActivity
}

function LessonActivitySelectMultiple({
  activity: { blocks, answers }
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
        {answers.map(answer => (
          <MultipleAnswerCard
            key={answer.text}
            text={answer.text}
          />
        ))}
      </LessonContent>
      <IonButton color='success'>
        Continue
      </IonButton>
    </>
  )
}

export default LessonActivitySelectMultiple;