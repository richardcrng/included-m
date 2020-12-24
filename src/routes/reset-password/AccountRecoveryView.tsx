import React from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { IoArrowBack, IoInformationCircleOutline } from "react-icons/io5";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

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
  margin: 1rem;
`;

// interface Props {
//   // course: CourseData;
//   onTryLogIn(email: string, password: string): void;
//   onTrySignUp(email: string, password: string): void;
//   onTryAnonymous(): void;
//   onClearError(): void;
//   error?: firebase.auth.AuthError;
// }

// type AccountRecoveryFormValue = "signup" | "login";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AccountRecoveryPageView() {
  const query = useQuery();
  const history = useHistory();
  const [showAlert, setShowAlert] = React.useState(false);
  const [emailTyped, setEmailTyped] = React.useState(query.get("email") ?? "");
  const [passwordTyped, setPasswordTyped] = React.useState("");

  return (
    <>
      <IonToolbar>
        <Buttons slot="start">
          <IoArrowBack
            onClick={() => {
              history.push("/sign-in");
            }}
            size={24}
          />
        </Buttons>
        <Buttons slot="end">
          <IoInformationCircleOutline
            size={24}
            onClick={() => {
              setShowAlert(true);
            }}
          />
        </Buttons>
        <Title>
          <Message>Account Recovery</Message>
        </Title>
        <IonProgressBar value={0.67} />
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>⛑️ We can fix this!</h1>
          <p>Your account is safe with us!</p>
          <p>
            If you've forgotten your password, we can email you a recovery code.
          </p>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={emailTyped}
              onIonChange={(e) => setEmailTyped(e.detail.value as string)}
            />
          </IonItem>
        </Container>
      </IonContent>
      <IonFooter style={{ backgroundColor: "white" }}>
        <IonButton expand="full">Get recovery code</IonButton>
      </IonFooter>
    </>
  );
}

export default AccountRecoveryPageView;
