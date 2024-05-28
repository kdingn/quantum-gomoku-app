"use client";

import { login, logout } from "@/firebase/login";
import { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  function loginWrapper() {
    login()
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function logoutWrapper() {
    logout()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <h3>page</h3>
      <span>{error}</span>
      <button onClick={loginWrapper}>login</button>
      <button onClick={logoutWrapper}>logout</button>
    </div>
  );
}

export default Page;
