import React from 'react';
import styled from 'styled-components'
import {
  IonApp,
  IonButton,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle
} from '@ionic/react';
import {
  IoArrowBack,
  IoClose,
  IoCheckboxSharp,
  IoSquare,
  IoSquareOutline
} from 'react-icons/io5'
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const content = [
  "The startup Juicero was convinced that its customers would pay nearly $700 for its product. By 2017, they had raised almost $120M and hired over 200 employees.",
  "But sales were middling after product launch. Despite slashing prices, Juicero was steadily losing money, especially after it came out that squeezing their bags by hand was just as efficient."
]

const Container = styled.div`
  margin: 1rem;
`

const Buttons = styled(IonButtons)`
  margin: 1rem;
`

const Title = styled(IonTitle)`
  height: 5rem;
`

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <Buttons slot='start'>
          <IoArrowBack size={24} />
        </Buttons>
        <Buttons slot='end'>
          <IoClose size={24} />
        </Buttons>
        <Title>
          <div>
            <IoCheckboxSharp size={18} />
            <IoCheckboxSharp size={18} />
            <IoCheckboxSharp size={18} />
            <IoSquare size={18} />
            <IoSquareOutline size={18} />
            <IoSquareOutline size={18} />
            <IoSquareOutline size={18} />
          </div>
          <div>Read and continue</div>
        </Title>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
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
    </IonReactRouter>
  </IonApp>
);

export default App;
