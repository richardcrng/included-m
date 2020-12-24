import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import LoadingPage from "../pages/LoadingPage";
import { Redirect } from "react-router";

function withAuth<P = any>(Component: React.FunctionComponent<P>) {
  return (props: P) => {
    const [user, loading, error] = useAuthState(firebase.auth());

    if (loading) {
      return <LoadingPage />;
    } else if (error) {
      return <Redirect to="/sign-in" />;
    } else if (user) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/sign-in" />;
    }
  };
}

export default withAuth;
