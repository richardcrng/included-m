import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import AccountRecoveryPageView from "./AccountRecoveryPageView";

function AccountRecoveryPageRoute() {
  const [authError, setAuthError] = useState<firebase.auth.AuthError>();

  return (
    <AccountRecoveryPageView
      error={authError}
      onClearError={() => setAuthError(undefined)}
      onGetRecovery={(email) => {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .catch((err) => {
            console.log(err);
            setAuthError(err);
          });
      }}
    />
  );
}

export default AccountRecoveryPageRoute;
