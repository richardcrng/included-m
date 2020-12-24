import React from "react";
import { useHistory } from "react-router";
import SignInPageView from "./SignInPageView";
import { DEFAULT_COURSE_ID } from "../../constants";

function SignInPageRoute() {
  const history = useHistory();

  return (
    <SignInPageView
      onTryAnonymous={() => history.push(`/learn/${DEFAULT_COURSE_ID}`)}
      onTryLogIn={() =>
        window.alert(
          "Not implemented yet - try continuing anonymously for now!"
        )
      }
      onTrySignUp={() =>
        window.alert(
          "Not implemented yet - try continuing anonymously for now!"
        )
      }
    />
  );
}

export default SignInPageRoute;
