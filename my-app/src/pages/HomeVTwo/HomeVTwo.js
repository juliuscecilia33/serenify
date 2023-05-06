import React, { useContext, useState, useEffect } from "react";
import "./HomeVTwo.css";
import Logo from "../../images/logo2.png";
import Cat from "../../images/Cat.png";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
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

export function HomeVTwo() {
  const { isAuthenticated, setAuth, admin } = useContext(Authentication);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  /*
    Admin Dropdown Button
  */

  return (
    <div className="content">
      <HStack spacing="24px">
        <Box>
          <img className="logo" alt={"Logo"} src={Logo} />
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
          <div className="log-in">Sign Out</div>
        </button>
      ) : (
        <Link to={ROUTES.LOGIN}>
          <div className="log-in">Log in</div>
        </Link>
      )}

      <div className="s1">
        <h1 className="big">
          Hello
          <br />
          &lt;･◡･&gt;!
          <br />
          <br />I am Serenify.
          <br />
          ---------
        </h1>
      </div>
      <div className="s2">
        <h1 className="big">Your</h1>
        <p className="small smallcross">
          &nbsp;Online&nbsp;
          <br />
          &nbsp;Anonymous&nbsp;
          <br />
          &nbsp;Mental Health&nbsp;
          <br />
          &nbsp;Prompt Based&nbsp;
          <br />
        </p>
        <h1 className="big">
          Forum.
          <br />
          ---------
        </h1>
      </div>
      <div className="s3">
        <p className="small">&nbsp;I like to</p>
        <h1 className="big">Scroll</h1>
        <p className="small">&nbsp;and</p>
        <h1 className="big">Hold</h1>
        <span className="small">
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Try it~^
          <br />
        </span>
        <h1 className="big">---------</h1>
        <img
          className="wheel"
          alt={"Wheel"}
          src={
            "https://anima-uploads.s3.amazonaws.com/projects/64480ae0ca3bfce771e46398/releases/6448516f8ae30cff1df92e11/img/wheel.svg"
          }
        />
      </div>
      <div className="s3">
        <p className="small">
          &nbsp;You can
          <br />
          &nbsp;Pet this cat
          <br />
          &nbsp;To move forward.
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className="big">---------</h1>
        </p>
        <Link to={ROUTES.PROMPT}>
          <img className="cat" alt={"Cat"} src={Cat} />
        </Link>
      </div>
    </div>
  );
}
