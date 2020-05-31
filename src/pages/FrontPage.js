import React, { useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../App";

const Index = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("el contexcto", user);
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <h1>Hello {user.getUsername()}</h1>
          <h2 onClick={() => Auth.signOut()}>Sign out</h2>
        </>
      ) : (
        <>
          <h2 onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}>
            Sign in with Facebook
          </h2>
          <h2 onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
            Sign in with Google
          </h2>
        </>
      )}
      <hr />
      <h2>Show listing</h2>
    </>
  );
};

export default Index;
