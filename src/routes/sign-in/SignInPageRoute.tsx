import React from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import SignInPageView from "./SignInPageView";
import { DEFAULT_COURSE_ID } from "../../constants";

function SignInPageRoute() {
  const history = useHistory();
  const [
    signInError,
    setSignInError,
  ] = React.useState<firebase.auth.AuthError>();
  const navigateToLearn = () => history.push(`/learn/${DEFAULT_COURSE_ID}`);
  return (
    <SignInPageView
      error={signInError}
      onClearError={() => setSignInError(undefined)}
      onTryAnonymous={() => {
        firebase.auth().signInAnonymously().then(navigateToLearn);
      }}
      onTryLogIn={(email, password) =>
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(navigateToLearn)
          .catch((err) => {
            setSignInError(err);
          })
      }
      onTrySignUp={(email, password) =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(navigateToLearn)
          .catch((err) => {
            setSignInError(err);
          })
      }
    />
  );
}

export default SignInPageRoute;
