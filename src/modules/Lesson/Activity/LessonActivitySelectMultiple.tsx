import React, { useMemo, useReducer } from 'react';
import {
  IonButton,
} from '@ionic/react';
import { shuffle } from 'lodash';
import riduce from 'riduce';
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
  const shuffledAnswers = useMemo(
    () => shuffle(answers),
    [answers]
  )

  const [reducer, actions] = useMemo(
    () => riduce(shuffledAnswers),
    [shuffledAnswers]
  )

  const [answersState, dispatch] = useReducer(reducer, shuffledAnswers)

  return (
    <>
      <LessonContent>
        {blocks.map(block => (
          <LessonContentBlock
            key={JSON.stringify(block)}
            block={block}
          />
        ))}
        {answersState.map(answer => (
          <MultipleAnswerCard
            key={answer.text}
            answer={answer}
          />
        ))}
      </LessonContent>
      <IonButton color='primary'>
        Continue
      </IonButton>
    </>
  )
}

export default LessonActivitySelectMultiple;