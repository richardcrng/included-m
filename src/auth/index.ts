import firebase from "firebase/app";

export const authErrorMessage = (error: firebase.auth.AuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "There is already an account registered to that email - did you mean to log in?";
    case "auth/invalid-email":
      return "That email address looks odd to us - make sure it's a conventional email!";
    case "auth/too-many-requests":
      return "We've noticed lots of login attempts to this email - to be safe, we've disabled login for this account temporarily";
    case "auth/user-not-found":
      return "We don't have any user accounts under that email address";
    case "auth/weak-password":
      return "To secure your account, please use a password that's at least 6 characters!";
    case "auth/wrong-password":
      return "Check what you've typed - that's not the correct password for that email address";
    default:
      return error.message;
  }
};
