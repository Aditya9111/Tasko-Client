import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Login() {
  const [registered, setRegistered] = useState(true);
  return (
    <>
      {registered ? (
        <LoginForm setRegistered={setRegistered} />
      ) : (
        <RegisterForm setRegistered={setRegistered} />
      )}
    </>
  );
}
