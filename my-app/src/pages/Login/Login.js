import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./Login.css";
import toplayer from "../../images/toplayer.png";
// import { Icon, ChevronRightIcon } from "@chakra-ui/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../context/Authentication";
import Logo from "../../images/logo2.png";
import { useToast } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { NavbarVTwo } from "../../components";

export function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setAuth, setAdmin, admin } =
    useContext(Authentication);
  const [loginError, setLoginError] = useState(false);
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    // verify all inputs

    const appBody = {
      useremail: userEmail,
      userpassword: userPassword,
    };

    axios
      .post(`${process.env.REACT_APP_BACKENDURL}users/login`, appBody)
      .then((response) => {
        //console.log("axios request called");
        console.log("login user response", response.data);
        if (response.data.userid) {
          localStorage.setItem("userid", response.data.userid);
          setAuth(true);
          setLoading(false);
          if (response.data.isadmin === true) {
            localStorage.setItem("isAdmin", response.data.isadmin);
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        } else {
          setAuth(false);
          setLoading(false);
        }

        toast({
          title: "You are Logged in!",
          description: "You successfully logged in! :D",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        navigate(ROUTES.HOMEVTWO);
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
        setLoginError(true);
      });
  };

  console.log("Email: ", userEmail);
  console.log("Password: ", userPassword);

  return (
    <>
      <NavbarVTwo />
      <div className="login-login">
        <div className="login-content">
          <div className="login-b">
            <h1 className="login-h-1">Login:</h1>
          </div>
          <div className="login-b-2">
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              className="login-div"
              placeholder="Email"
            />
            <input
              onChange={(e) => setUserPassword(e.target.value)}
              className="login-text-wrapper-2"
              placeholder="Password"
              type="Password"
            />

            <button
              onClick={(e) => handleLogin(e)}
              className="login-text-wrapper-3"
            >
              -&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
