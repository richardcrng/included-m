import React from 'react';
import styled from 'styled-components'
import {
  IonApp,
  IonButton,
  IonHeader,
} from '@ionic/react';
import ProgressToolbar from '../../components/molecules/ProgressToolbar';

const content = [
  "The startup Juicero was convinced that its customers would pay nearly $700 for its product. By 2017, they had raised almost $120M and hired over 200 employees.",
  "But sales were middling after product launch. Despite slashing prices, Juicero was steadily losing money, especially after it came out that squeezing their bags by hand was just as efficient."
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
      <Container>
        {content.map(block => {
          return (
            <p>{block}</p>
          )
        })}
      </Container>
      <IonButton color='success'>
        Continue
    </IonButton>
    </>
  )
}

export default Lesson