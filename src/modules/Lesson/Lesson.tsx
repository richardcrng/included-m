import React from 'react';
import styled from 'styled-components'
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel
} from '@ionic/react';
import ProgressToolbar from '../../components/molecules/ProgressToolbar';
import { ContentBlock, isSelectMultipleAnswers } from './lesson-types';
import MultipleAnswerCard from '../../components/atoms/MultipleAnswerCard';
import LessonContentBlock from './LessonContentBlock';

const content: ContentBlock[] = [
  "Within six months, Juicero had shuttered, offering a full refund to their customers.",
  "What do you suppose were some of the missteps that led to Juicero's demise?",
  {
    type: "select-multiple-answers",
    answers: [
      {
        text: "They needed more celebrity endorsements.",
        isCorrect: false
      },
      {
        text: "They assumed they knew what customers wanted from the product.",
        isCorrect: true
      },
      {
        text: "They didn't raise enough money.",
        isCorrect: false
      },
      {
        text: "They scaled correctly without knowing for sure their business model worked.",
        isCorrect: true
      }
    ]
  }
]

const Container = styled.div`
  margin: 1rem;
`

function Lesson() {
  return (
    <>
      <IonHeader>
        <ProgressToolbar
          currentPage={2}
          totalPages={11}
        />
      </IonHeader>
      <IonContent>
        <Container>
          {content.map(block => (
            <LessonContentBlock
              key={JSON.stringify(block)}
              block={block}
            />
          ))}
        </Container>
      </IonContent>
      <IonButton color='success'>
        Continue
      </IonButton>
    </>
  )
}

export default Lesson