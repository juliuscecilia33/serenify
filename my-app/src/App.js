import * as ROUTES from "./constants/routes";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Login,
  Home,
  Register,
  UserProfile,
  Prompt,
  HomeVTwo,
  Report,
  PostDetail,
  InternalPrompt,
  InternalReport,
  InternalReportPostDetail,
  UserComments,
  UserPosts,
  UserLikes,
  AdminPage,
  About,
} from "./pages";
import { ChakraProvider } from "@chakra-ui/react";
import { Authentication } from "./context/Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  const checkAuthenticated = () => {
    localStorage.getItem("userid")
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  };

  const checkAdmin = () => {
    localStorage.getItem("isAdmin") ? setAdmin(true) : setAdmin(false);
  };

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
    <Authentication.Provider
      value={{ isAuthenticated, setAuth, admin, setAdmin }}
    >
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.USER} element={<UserProfile />} />
            <Route path={ROUTES.PROMPT} element={<Prompt />} />
            <Route path={ROUTES.HOMEVTWO} element={<HomeVTwo />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.REPORT} element={<Report />} />
            <Route path={ROUTES.POSTDETAIL} element={<PostDetail />} />
            <Route path={ROUTES.USERPOSTS} element={<UserPosts />} />
            <Route path={ROUTES.USERCOMMENTS} element={<UserComments />} />
            <Route path={ROUTES.USERLIKES} element={<UserLikes />} />
            <Route
              path={ROUTES.INTERNALPROMPT}
              element={admin ? <InternalPrompt /> : <HomeVTwo />}
            />
            <Route
              path={ROUTES.INTERNALREPORT}
              element={admin ? <InternalReport /> : <HomeVTwo />}
            />
            <Route
              path={ROUTES.INTERNALREPORTPOSTDETAIL}
              element={admin ? <InternalReportPostDetail /> : <HomeVTwo />}
            />
            <Route
              path={ROUTES.ADMINPAGE}
              element={admin ? <AdminPage /> : <HomeVTwo />}
            />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Authentication.Provider>
  );
}

export default App;
