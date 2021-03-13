import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import AccountRecoveryPageView from "./AccountRecoveryPageView";

function AccountRecoveryPageRoute() {
  const [authError, setAuthError] = useState<firebase.auth.AuthError>();
  const [codeSent, setCodeSent] = useState(false);

  return (
    <AccountRecoveryPageView
      codeSent={codeSent}
      error={authError}
      onClearError={() => setAuthError(undefined)}
      onGetRecovery={(email) => {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => setCodeSent(true))
          .catch(setAuthError);
      }}
    />
  );
}

export default AccountRecoveryPageRoute;
