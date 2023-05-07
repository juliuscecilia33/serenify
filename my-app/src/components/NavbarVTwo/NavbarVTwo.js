import React, { useState, useContext } from "react";
import Logo from "../../images/logo2.png";
import AdminIconTwo from "../../images/AdminIconTwo.png";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import "./NavbarVTwo.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  HStack,
  Button,
  Box,
} from "@chakra-ui/react";

export function NavbarVTwo() {
  const { isAuthenticated, setAuth, admin } = useContext(Authentication);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("userid");
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <div className="navbar-container">
        <img className="navbar-logo" alt={"Logo"} src={Logo} />
        <HStack spacing="24px">
          {admin && (
            <Menu>
              <MenuButton
                as={Button}
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "gray.400" }}
                _focus={{ boxShadow: "outline" }}
                clickOnBlur
              >
                <img className="admin-logo" alt={"Logo"} src={AdminIconTwo} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/admin/prompt");
                  }}
                >
                  <h3>Prompt</h3>
                </MenuItem>
                <MenuItem>
                  <h3>Report</h3>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
        {isAuthenticated ? (
          <button onClick={(e) => logout(e)}>
            <div className="auth-button">Sign Out</div>
          </button>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <div className="auth-button">Log in</div>
          </Link>
        )}
      </div>
    </>
  );
}
