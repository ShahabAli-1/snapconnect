import React from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import Button from "@mui/material/Button";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { login } from "./features/appSlice";

const Login = () => {
  const dispatch = useDispatch();
  const signIN = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img alt="" />
        <Button variant="outlined" onClick={signIN}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
