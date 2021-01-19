import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import LoadingPage from "../pages/LoadingPage";
import { Redirect } from "react-router";

function withAuthForward<P = any>(
  Component: React.FunctionComponent<P>,
  redirectTo: string
) {
  return (props: P) => {
    const [user, loading] = useAuthState(firebase.auth());

    if (loading) {
      return <LoadingPage />;
    } else if (user) {
      return <Redirect to={redirectTo} />;
    } else {
      return <Component {...props} />;
    }
  };
}

export default withAuthForward;
