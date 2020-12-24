import React from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import SignInPageView from "./SignInPageView";
import { DEFAULT_COURSE_ID } from "../../constants";

function SignInPageRoute() {
  const history = useHistory();
  const navigateToLearn = () => history.push(`/learn/${DEFAULT_COURSE_ID}`);

  return (
    <SignInPageView
      onTryAnonymous={navigateToLearn}
      onTryLogIn={(email, password) =>
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(navigateToLearn)
          .catch((err) => console.log(err))
      }
      onTrySignUp={(email, password) =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(navigateToLearn)
          .catch((err) => console.log(err))
      }
    />
  );
}

export default SignInPageRoute;
