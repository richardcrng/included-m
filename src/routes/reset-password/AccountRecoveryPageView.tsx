import React from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { IoArrowBack, IoInformationCircleOutline } from "react-icons/io5";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { authErrorMessage } from "../../auth";

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

interface Props {
  codeSent?: boolean;
  error?: firebase.auth.AuthError;
  onClearError(): void;
  onGetRecovery(email: string): void;
}

function AccountRecoveryPageView({
  codeSent,
  error,
  onClearError,
  onGetRecovery,
}: Props) {
  const query = useQuery();
  const history = useHistory();
  const [alertClosed, setAlertClosed] = React.useState(false);
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
              // setShowAlert(true);
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
          <p>Your account is safe with us.</p>
          <p>
            If you've forgotten your password, we can email you a recovery code.
          </p>
          <p>
            Enter your email address below, and we'll send you an email with a
            code which you can use to reset your password!
          </p>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={emailTyped}
              onIonChange={(e) => {
                onClearError();
                setEmailTyped(e.detail.value as string);
              }}
            />
          </IonItem>
          <IonButton expand="full" onClick={() => onGetRecovery(emailTyped)}>
            Get recovery code
          </IonButton>
          {error && (
            <IonText color="danger" style={{ fontSize: "0.7rem" }}>
              {authErrorMessage(error)}
            </IonText>
          )}
          <IonAlert
            isOpen={!!codeSent && !alertClosed}
            header="Recovery code sent"
            message="We've sent a recovery code to your email address. Please follow the instructions there to recover your account!"
            buttons={["Okay"]}
          />
        </Container>
      </IonContent>
    </>
  );
}

export default AccountRecoveryPageView;