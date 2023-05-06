import * as ROUTES from "./constants/routes";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";

import {
  Login,
  Home,
  Register,
  User,
  Prompt,
  HomeVTwo,
  Post,
  Report,
  PostDetail,
  InternalPrompt,
} from "./pages";
import { ChakraProvider } from "@chakra-ui/react";
import { Authentication } from "./context/Authentication";
import { ProtectedRoute } from "./helpers/protectedroute";
import { ProtectedRouteAdmin } from "./helpers/ProtectedRouteAdmin";
import apiClient from "./instance/config";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  const checkAuthenticated = () => {
    localStorage.getItem("userid")
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  };

  const checkAdmin = () => {
    localStorage.getItem('isAdmin')
    ? setAdmin(true) : setAdmin(false)
  }

  useEffect(() => {
    checkAuthenticated();
    checkAdmin();
  }, []);

  console.log("user is authenticated: ", isAuthenticated);
  console.log("this is admin in App", admin);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Authentication.Provider value={{ isAuthenticated, setAuth, admin, setAdmin }}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.USER} element={<User />} />
            <Route path={ROUTES.PROMPT} element={<Prompt />} />
            <Route path={ROUTES.HOMEVTWO} element={<HomeVTwo />} />
            <Route path={ROUTES.REPORT} element={<Report />} />
            <Route path={ROUTES.POSTDETAIL} element={<PostDetail />} />
            <Route path={ROUTES.INTERNALPROMPT} element={ admin ? <InternalPrompt /> : <HomeVTwo />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Authentication.Provider>
  );
}

export default App;


  // const userType = async () => {
  //   await apiClient
  //     .get(`/users/${localStorage.getItem("userid")}`)
  //     .then((response) => {
  //       console.log("response", response);
  //       localStorage.setItem("isAdmin", response.data.isadmin);
  //       setAdmin(response.data.isadmin);
  //     })
  //     .catch((err) => {
  //       console.err(err.message);
  //     });
  // };
