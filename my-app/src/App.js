import * as ROUTES from "./constants/routes";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Home, Register, User, Prompt, HomeVTwo } from "./pages";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.USER} element={<User />} />
          <Route path={ROUTES.PROMPT} element={<Prompt />} />
          <Route path={ROUTES.HOMEVTWO} element={<HomeVTwo />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
