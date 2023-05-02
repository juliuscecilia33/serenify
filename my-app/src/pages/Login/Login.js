import React, { useState, useContext } from "react";
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

export function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useContext(Authentication);
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
        navigate(ROUTES.HOMEVTWO);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast({
          title: "oops *_*",
          description: error,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  console.log("Email: ", userEmail);
  console.log("Password: ", userPassword);

  return (
    <div className="login-login">
      <div className="login-content">
        <img className="login-logo" alt={"Logo"} src={Logo} />
        <div className="login-text-wrapper">Sign up</div>
        <div className="login-tag" />
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
  );
}
