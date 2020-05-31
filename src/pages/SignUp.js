import React from "react";
import { Auth } from "aws-amplify";

const SignUp = () => {
  return (
    <>
      <h2 onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}>
        Facebook
      </h2>
      <h2 onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
        Google
      </h2>
      <h2 onClick={() => Auth.signOut()}>Sair</h2>
      <h2 onClick={() => Auth.federatedSignIn()}>Hosted UI</h2>
    </>
  );
};

export default SignUp;
