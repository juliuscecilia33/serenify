import React, { useState, useContext } from "react";
import Logo from "../../images/logo2.png";
import AdminIconTwo from "../../images/AdminIconTwo.png";
import { Authentication } from "../../context/Authentication";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cat from "../../images/Cat.png";
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

    localStorage.clear();
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <div className="navbar-container">
        <Link to={ROUTES.HOMEVTWO}>
          <img className="navbar-logo" alt={"Logo"} src={Logo} />
        </Link>
        <HStack spacing="24px">
          {admin && (
            <Menu>
              <MenuButton
                as={Button}
                clickOnBlur
                rightIcon={<ChevronDownIcon />}
                transition="all 0.2s"
                px={5}
                py={3}
                mx={12}
                colorScheme="blue"
              >
                Admin
              </MenuButton>
              <MenuList>
                <MenuGroup title="Posts">
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/prompt");
                    }}
                  >
                    <h3>Prompt</h3>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/report");
                    }}
                  >
                    <h3>Report</h3>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Users"></MenuGroup>
              </MenuList>
            </Menu>
          )}
        </HStack>
        {isAuthenticated ? (
          <button onClick={(e) => logout(e)}>
            {/* <div className="auth-button">Sign Out</div> */}
            <img className="cat-image-logo" alt={"Cat"} src={Cat} />
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
