"use client";

import { GlobalContext } from "@/app/layout";
import { login, logout } from "@/libs/login";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
  const [loginUser, setLoginUser] = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const router = useRouter();

  function loginWrapper() {
    login()
      .then((result) => {
        setLoginUser(result.user);
        sessionStorage.setItem("gomokuUser", JSON.stringify(result.user));
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function logoutWrapper() {
    logout()
      .then(() => {
        setLoginUser(null);
        sessionStorage.removeItem("gomokuUser");
        router.push("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <span>{error}</span>
      <button onClick={loginWrapper}>login</button>
      <button onClick={logoutWrapper}>logout</button>
    </div>
  );
}
