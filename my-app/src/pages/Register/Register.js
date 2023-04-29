import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "../Login/Login.css";
import toplayer from "../../images/toplayer.png";
import { Icon, ChevronRightIcon } from "@chakra-ui/icons";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setAuth } = useContext(Authentication);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (userConfirmPassword !== userPassword) {
      console.error("Passwords don't match!");
      return;
    }

    // verify all inputs

    const appBody = {
      useremail: userEmail,
      userpassword: userPassword,
    };

    axios
      .post("http://localhost:3005/users/register", appBody)
      .then((response) => {
        console.log("axios request called");

        console.log("login user response", response.data);
        if (response.data.userid) {
          localStorage.setItem("userid", response.data.userid);
          setAuth(true);
          setLoading(false);
        } else {
          setAuth(false);
          setLoading(false);
        }
        navigate(ROUTES.HOME);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <div class="container">
        <img src={toplayer} alt="landing page" class="top-landing" />
        <h1>Sign up</h1>
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          class="username_input"
          placeholder="Email"
        />
        <input
          onChange={(e) => setUserPassword(e.target.value)}
          class="password_input"
          placeholder="Password"
          type="Password"
        />
        <input
          onChange={(e) => setUserConfirmPassword(e.target.value)}
          class="password_input_again"
          placeholder="Confirm Password"
          type="Password"
        />
        <button onClick={(e) => handleRegister(e)}>
          <Icon mt={16} boxSize={10} as={ChevronRightIcon} />
        </button>
      </div>
    </>
  );
}
