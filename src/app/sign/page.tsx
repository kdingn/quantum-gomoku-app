"use client";

import { db } from "@/libs/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usernameSignup: "",
    passwordSignup: "",
    errorSignup: "",
    usernameSignin: "",
    passwordSignin: "",
    errorSignin: "",
  });

  async function signup() {
    const querySnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("username", "==", formData.usernameSignup)
      )
    );
    if (!querySnapshot.empty) {
      setFormData({
        ...formData,
        ["errorSignup"]: `${formData.usernameSignup} already exists`,
      });
    } else {
      await addDoc(collection(db, "users"), {
        username: formData.usernameSignup,
        password: formData.passwordSignup,
      });
      sessionStorage.setItem("username", formData.usernameSignup);
      router.push("/");
    }
  }

  async function signin() {
    const querySnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("username", "==", formData.usernameSignin)
      )
    );
    if (querySnapshot.empty) {
      setFormData({ ...formData, ["errorSignin"]: "User not found" });
    } else {
      const result = querySnapshot.docs[0].data();
      if (result.password !== formData.passwordSignin) {
        setFormData({ ...formData, ["errorSignin"]: "Password unmatched" });
      } else {
        sessionStorage.setItem("username", result.username);
        router.push("/");
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDownSignin = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      signin();
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <div className="login-form-outline">
          <div>
            <h3>Create Account</h3>
            <span>{formData.errorSignup}</span>
            <form>
              <input
                className="login-form-inputtext"
                placeholder="username"
                name="usernameSignup"
                onChange={handleInputChange}
                maxLength={10}
              ></input>
              <br />
              <input
                type="password"
                className="login-form-inputtext"
                placeholder="password"
                name="passwordSignup"
                onChange={handleInputChange}
              ></input>
              <br />
              <div className="login-form-inputsubmit">
                <input type="button" value="create" onClick={signup}></input>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form-outline">
          <div>
            <h3>Sign In</h3>
            <span>{formData.errorSignin}</span>
            <form>
              <input
                className="login-form-inputtext"
                placeholder="username"
                name="usernameSignin"
                onChange={handleInputChange}
              ></input>
              <br />
              <input
                type="password"
                className="login-form-inputtext"
                placeholder="password"
                name="passwordSignin"
                onChange={handleInputChange}
                onKeyDown={handleKeyDownSignin}
              ></input>
              <br />
              <div className="login-form-inputsubmit">
                <input type="button" value="sign-in" onClick={signin}></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
