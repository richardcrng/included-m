import React from "react";
import { Redirect, useHistory } from "react-router";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";
import SignInPageView from "./SignInPageView";
import { DEFAULT_COURSE_ID } from "../../constants";
import LoadingPage from "../../pages/LoadingPage";

function SignInPageRoute() {
  const history = useHistory();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [
    signInError,
    setSignInError,
  ] = React.useState<firebase.auth.AuthError>();
  const navigateToLearn = () => history.push(`/learn/${DEFAULT_COURSE_ID}`);

  if (loading) {
    return <LoadingPage />;
  } else if (user) {
    return <Redirect to={`/learn/${DEFAULT_COURSE_ID}`} />;
  } else {
    return (
      <SignInPageView
        error={signInError}
        onClearError={() => setSignInError(undefined)}
        onTryAnonymous={navigateToLearn}
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
}

export default SignInPageRoute;
