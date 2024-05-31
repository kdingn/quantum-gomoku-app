"use client";

import { GlobalContext } from "@/app/layout";
import { login, logout } from "@/libs/login";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import "@/styles/global.css";
import { db } from "@/libs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Page() {
  // const [loginUser, setLoginUser] = useContext(GlobalContext);
  const [errorSignup, setErrorSignup] = useState(null);
  const [errorSignin, setErrorSignin] = useState(null);
  // const router = useRouter();

  // function loginWrapper() {
  //   login()
  //     .then((result) => {
  //       setLoginUser(result.user);
  //       sessionStorage.setItem("gomokuUser", JSON.stringify(result.user));
  //       router.push("/");
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }

  // function logoutWrapper() {
  //   logout()
  //     .then(() => {
  //       setLoginUser(null);
  //       sessionStorage.removeItem("gomokuUser");
  //       router.push("/login");
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }

  async function signin(username) {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("username", "==", username))
    );
    if (querySnapshot.empty) {
      setErrorSignin("User not found");
    }
    console.log(querySnapshot.docs);
    //       setLoginUser(result.user);
    //       sessionStorage.setItem("gomokuUser", JSON.stringify(result.user));
    //       router.push("/");
  }

  return (
    <div className="login-form">
      <div className="login-form-container">
        <div className="login-form-outline">
          <div>
            <h3>Create Account</h3>
            <form>
              <input
                className="login-form-inputtext"
                placeholder="username"
              ></input>
              <br />
              <input
                type="password"
                className="login-form-inputtext"
                placeholder="password"
              ></input>
              <br />
              <div className="login-form-inputsubmit">
                <input type="submit" value="create"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form-outline">
          <div>
            <h3>Sign In</h3>
            <span>{errorSignin}</span>
            <form>
              <input
                className="login-form-inputtext"
                placeholder="username"
              ></input>
              <br />
              <input
                type="password"
                className="login-form-inputtext"
                placeholder="password"
              ></input>
              <br />
              <div className="login-form-inputsubmit">
                <input
                  type="button"
                  value="sign-in"
                  onClick={signin.bind(null, "admin")}
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
