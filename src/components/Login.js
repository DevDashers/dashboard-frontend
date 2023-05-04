import { useAuth0 } from "@auth0/auth0-react";
import React from "react";


const buttonStyle = {
  color: "white"
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button id="button1" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
