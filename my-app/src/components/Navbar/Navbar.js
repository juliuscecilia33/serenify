import React, { useState, useContext } from "react";
import "./Navbar.css";
import biglogo from "../../images/biglogo.png";
import Logo from "../../images/logo2.png";
import logouticon from "../../images/logout.png";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
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
import AdminIconTwo from "../../images/AdminIconTwo.png";

export function Navbar() {
  const { isAuthenticated, setAuth, admin } = useContext(Authentication);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("userid");
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  return (
    <div class="navbar-container">
      <HStack spacing="24px">
        <Box>
          <Button onClick={() => navigate("/")}>
            <img className="logo" alt={"Logo"} src={Logo} />
          </Button>
        </Box>
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
          <img class="logout-image" src={logouticon} alt="Logout" />
        </button>
      ) : (
        <Link to={ROUTES.LOGIN}>
          <button>
            <p>Login</p>
          </button>
        </Link>
      )}
    </div>
  );
}
