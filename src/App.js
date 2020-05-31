import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { FrontPage, SignUp } from "./pages";
import { messages } from "./i18n";

import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: process.env.REACT_APP_SIGN_IN_REDIRECT_URL,
    redirectSignOut: process.env.REACT_APP_SIGN_OUT_REDIRECT_URL,
  },
});

export const UserContext = React.createContext({ user: null });

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser({ user: data });
          break;
        case "signOut":
          setUser({ user: null });
          break;
        case "customOAuthState":
          console.log("@@@ customOAuthState", { customState: data });
          break;
        default:
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => setUser({ user }))
      .catch(() => console.log("Not signed in"));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <IntlProvider locale='en-US' messages={messages["en-US"]}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <FrontPage />}></Route>
            <Route path='/signup' render={() => <SignUp />}></Route>
            <Route path='/login' render={() => "log in"}></Route>
            <Route path='/listing' render={() => "listing"}></Route>
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </UserContext.Provider>
  );
};

export default App;
