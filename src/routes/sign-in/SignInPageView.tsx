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
  margin: 1rem;
`;

interface Props {
  // course: CourseData;
  onTryLogIn(email: string, password: string): void;
  onTrySignUp(email: string, password: string): void;
  onTryAnonymous(): void;
  onClearError(): void;
  error?: firebase.auth.AuthError;
}

type SignInFormValue = "signup" | "login";

function SignInPageView({
  error,
  onTryLogIn,
  onTrySignUp,
  onTryAnonymous,
  onClearError,
}: Props) {
  const history = useHistory();
  const [formMode, setFormMode] = React.useState<SignInFormValue>("signup");
  const [showAlert, setShowAlert] = React.useState(false);
  const [emailTyped, setEmailTyped] = React.useState("");
  const [passwordTyped, setPasswordTyped] = React.useState("");

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
          <IoInformationCircleOutline
            size={24}
            onClick={() => {
              setShowAlert(true);
            }}
          />
        </Buttons>
        <Title>
          <Message>Almost there...</Message>
        </Title>
        <IonProgressBar value={0.5} />
      </IonToolbar>
      <IonContent>
        <Container>
          <h1>
            {formMode === "signup"
              ? "👋🏾 Nice to meet you!"
              : "👋🏾 Welcome back!"}
          </h1>
          <p>
            {formMode === "signup"
              ? "We'd love to be able to save your learning preferences and progress."
              : "Let's retrieve your learning preferences and progress."}
          </p>
          <div>
            <IonSegment
              value={formMode}
              onIonChange={(e) => {
                onClearError();
                setFormMode(e.detail.value as SignInFormValue);
              }}
            >
              <IonSegmentButton value="signup">Sign up</IonSegmentButton>
              <IonSegmentButton value="login">Log in</IonSegmentButton>
            </IonSegment>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  autofocus
                  placeholder="aaliyah@address.com"
                  value={emailTyped}
                  onIonChange={(e) => {
                    onClearError();
                    setEmailTyped(e.detail.value as string);
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  autofocus
                  placeholder="correct-horse-battery-staple"
                  value={passwordTyped}
                  onIonChange={(e) => {
                    onClearError();
                    setPasswordTyped(e.detail.value as string);
                  }}
                />
              </IonItem>
            </IonList>
            <IonButton
              expand="full"
              size="large"
              onClick={() => {
                formMode === "signup"
                  ? onTrySignUp(emailTyped, passwordTyped)
                  : onTryLogIn(emailTyped, passwordTyped);
              }}
            >
              {formMode === "signup"
                ? "I'm ready to start"
                : "Continue my journey"}
            </IonButton>
            {error && (
              <IonText color="danger" style={{ fontSize: "0.7rem" }}>
                {error.code === "auth/email-already-in-use" ? (
                  <>
                    There is already an account registered to that email - did
                    you<span> </span>
                    <a
                      onClick={() => {
                        setFormMode("login");
                        onTryLogIn(emailTyped, passwordTyped);
                      }}
                    >
                      intend to log in?
                    </a>
                  </>
                ) : error.code === "auth/user-not-found" ? (
                  <>
                    We couldn't find an account registered to that email - did
                    you<span> </span>
                    <a
                      onClick={() => {
                        setFormMode("signup");
                      }}
                    >
                      intend to sign up
                    </a>
                    ?
                  </>
                ) : (
                  <>{sanitisedErrorMessage(error)}</>
                )}
              </IonText>
            )}
          </div>
          <Container>
            <IonText color="medium" style={{ fontSize: "0.7rem" }}>
              We'd love you to use an account - it helps us to save your
              progress, tailor your experience and keep improving our content.
              But, since we're committed to making our education as freely open
              as possible, you can also continue as a guest.
            </IonText>
          </Container>
        </Container>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Why do I need to sign up?"
          message="You don't! You can continue with a guest account. However, this means that future features (e.g. saving of progress) will be unavailable to you, so we recommend signing up if you can."
          buttons={["Back"]}
        />
      </IonContent>
      <IonFooter style={{ backgroundColor: "white" }}>
        <IonButton
          expand="full"
          color="medium"
          size="small"
          onClick={onTryAnonymous}
        >
          Browse with guest account
        </IonButton>
      </IonFooter>
    </>
  );
}

const sanitisedErrorMessage = (error: firebase.auth.AuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "There is already an account registered to that email - did you mean to log in?";
    case "auth/invalid-email":
      return "That email address looks odd to us - make sure it's a conventional email!";
    case "auth/too-many-requests":
      return "We've noticed lots of login attempts to this email - to be safe, we've disabled login for this account temporarily";
    case "auth/user-not-found":
      return "We couldn't find an account registered";
    case "auth/weak-password":
      return "To secure your account, please use a password that's at least 6 characters!";
    case "auth/wrong-password":
      return "Check what you've typed - that's not the correct password for that email address";
    default:
      return error.message;
  }
};

export default SignInPageView;
