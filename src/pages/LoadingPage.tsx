import React from "react";
import styled from "styled-components";
import {
  IonButtons,
  IonContent,
  IonProgressBar,
  IonSkeletonText,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";
import { IoArrowBack, IoInformationCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router";

const Buttons = styled(IonButtons)`
  margin: 0 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  margin: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

const Container = styled.div`
  margin: 2rem;
`;

function LoadingPage() {
  const history = useHistory();

  return (
    <>
      <IonToolbar>
        <Buttons slot="start">
          <IoArrowBack
            onClick={() => {
              history.goBack();
            }}
            size={24}
          />
        </Buttons>
        <Buttons slot="end">
          <IonSpinner name="dots" />
        </Buttons>
        <Title>
          <Message>Loading...</Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <IonProgressBar type="indeterminate" />
        <Container>
          <IonSkeletonText animated style={{ width: "60%" }} />
          <IonSkeletonText animated />
          <IonSkeletonText animated style={{ width: "88%" }} />
          <IonSkeletonText animated style={{ width: "70%" }} />
          <IonSkeletonText animated style={{ width: "60%" }} />
        </Container>
      </IonContent>
    </>
  );
}

export default LoadingPage;
