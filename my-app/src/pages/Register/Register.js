import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "../Register/Register.css";
import toplayer from "../../images/toplayer.png";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/logo2.png";
import { useToast } from "@chakra-ui/react";

export function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setAuth } = useContext(Authentication);
  const navigate = useNavigate();
  const toast = useToast();

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
      .post(`${process.env.REACT_APP_BACKENDURL}users/register`, appBody)
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

        toast({
          title: "Welcome!",
          description: "Account Successfully Created! ( ´◔ ω◔`) ノシ",
          status: "success",
          duration: 3500,
          isClosable: true,
        });

        navigate(ROUTES.PROMPT);
      })
      .catch((error) => {
        toast({
          title: "Oops (°Ω°)/",
          description: `${error.response.data}`,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <div className="signup-signup">
        <div className="signup-content">
          <img className="signup-logo" alt={"Logo"} src={Logo} />
          <div className="signup-log-in">Log In</div>
          <div className="signup-tag" />
          <div className="signup-b">
            <h1 className="signup-text-wrapper">Sign up:</h1>
          </div>
          <div className="signup-b-2">
            <input
              className="signup-div"
              placeholder="Email"
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              onChange={(e) => setUserPassword(e.target.value)}
              className="signup-text-wrapper-2"
              placeholder="Password"
              type="Password"
            />
            <input
              onChange={(e) => setUserConfirmPassword(e.target.value)}
              className="signup-text-wrapper-2"
              placeholder="Confirm Password"
              type="Password"
            />
            <button
              onClick={(e) => handleRegister(e)}
              className="signup-text-wrapper-3"
            >
              -&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
