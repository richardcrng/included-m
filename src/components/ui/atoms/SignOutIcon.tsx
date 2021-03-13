import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { IoExitOutline } from "react-icons/io5";
import { useHistory } from "react-router";

function SignOutIcon() {
  const history = useHistory();

  return (
    <IoExitOutline
      size={24}
      onClick={async () => {
        firebase
          .auth()
          .signOut()
          .then(() => history && history.push("/"));
      }}
    />
  );
}

export default SignOutIcon;
