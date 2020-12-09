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
          <h1>Welcome - and be careful!</h1>
          <p>Welcome to this proof of concept for Included M.</p>
          <p>It's under construction - so expect bugs and incomplete content!</p>
          <IonButton
            routerLink='/course'
            expand='full'
          >
            Start
          </IonButton>
        </Container>
      </IonContent>
    </>
  )
}

export default HomePage;