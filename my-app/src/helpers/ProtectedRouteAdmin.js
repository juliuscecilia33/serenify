import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRouteAdmin(props, children) {
  console.log("isAdmin", props.isAdmin);
  if (!props.isAdmin) {
    return <Navigate to="/prompt" replace />;
  }
  console.log("in page");
  return <h1>In Protected Page</h1>;
  //   return <Navigate to="/" replace />;
}
