import React from 'react';
import styled from 'styled-components'
import {
  IonContent,
} from '@ionic/react';

const Container = styled.div`
  margin: 1rem;
`

const LessonContent: React.FC<{}> = ({
  children
}) => {
  return (
    <IonContent>
      <Container>
        {children}
      </Container>
    </IonContent>
  )
}

export default LessonContent;