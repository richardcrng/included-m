import { IonButton, IonContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  margin: 1rem;
`

function Home() {

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
          <IonButton href='/course'>
            Start
          </IonButton>
        </Container>
      </IonContent>
    </>
  )
}

export default Home;