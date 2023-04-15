import * as ROUTES from "./constants/routes";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Home, Register, Resources, User, Feed } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.RESOURCES} element={<Resources />} />
        <Route path={ROUTES.USER} element={<User />} />
        <Route path={ROUTES.FEED} element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
