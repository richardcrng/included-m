import { IonButton, IonContent, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  margin: 1rem;
`

function HomePage() {

  return (
    <>
      <IonToolbar>
        <IonTitle>
          Included M
        </IonTitle>
      </IonToolbar>
      <IonContent>
        <Container>
          Included M blah blah
          <IonButton routerLink='/course'>
            Start
          </IonButton>
        </Container>
      </IonContent>
    </>
  )
}

export default HomePage;