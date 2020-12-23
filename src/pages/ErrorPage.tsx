import React from "react";
import styled from "styled-components";
import {
  IonButtons,
  IonContent,
  IonLoading,
  IonProgressBar,
  IonSkeletonText,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";
import { IoArrowBack, IoWarningOutline } from "react-icons/io5";
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

function ErrorPage() {
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
          <IoWarningOutline size={24} color="red" />
        </Buttons>
        <Title>
          <Message>Oops!</Message>
        </Title>
      </IonToolbar>
      <IonContent>
        <Container>We ran into an error</Container>
      </IonContent>
    </>
  );
}

export default ErrorPage;
