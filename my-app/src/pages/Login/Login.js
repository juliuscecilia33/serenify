import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "./Login.css";
import toplayer from "../../images/toplayer.png";
// import { Icon, ChevronRightIcon } from "@chakra-ui/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../context/Authentication";

export function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useContext(Authentication);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    // verify all inputs

    const appBody = {
      useremail: userEmail,
      userpassword: userPassword,
    };

    axios
      .post("http://localhost:3005/users/login", appBody)
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

  console.log("Email: ", userEmail);
  console.log("Password: ", userPassword);

  return (
    <>
      <div className="container">
        <img src={toplayer} alt="landing page" class="top-landing" />
        <h1>Log in</h1>
        <input
          class="username_input"
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          class="password_input"
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          type="Password"
        />
        {/* <button>
          <Icon mt={16} boxSize={10} as={ChevronRightIcon} />
        </button> */}
        <button onClick={(e) => handleLogin(e)} className="login_button">
          <BsArrowRightCircle />
        </button>
      </div>
    </>
  );
}
