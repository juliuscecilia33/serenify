import React, { useContext } from "react";
import Logo from "../../images/logo2.png";
import { Authentication } from "../../context/Authentication";
import CatBolded from "../../images/catbolded.png";
import { useNavigate } from "react-router";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import "./NavbarVTwo.css";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export function NavbarVTwo() {
  const { isAuthenticated, setAuth, admin } = useContext(Authentication);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    setAuth(false);
    localStorage.clear();
    console.log("User logged out");

    navigate(ROUTES.HOMEVTWO);
  };

  return (
    <>
      <div className="navbar-container">
        <Link to={ROUTES.HOMEVTWO}>
          <img className="navbar-logo" alt={"Logo"} src={Logo} />
        </Link>
        {isAuthenticated && admin && (
          <Link to={ROUTES.ADMINPAGE}>
            <div className="auth-button">Admin</div>
          </Link>
        )}
        {isAuthenticated ? (
          // <button onClick={(e) => logout(e)}>
          <>
            <Menu>
              <MenuButton as={Button} colorScheme="null">
                <img className="cat-image-logo" alt={"Cat"} src={CatBolded} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate(ROUTES.PROMPT)}>
                  Today's Prompt
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    navigate(`/${localStorage.getItem("userid")}/profile`)
                  }
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate(ROUTES.ABOUT)}>
                  About us
                </MenuItem>
                <MenuItem onClick={(e) => logout(e)}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Link to={ROUTES.REGISTER}>
            <div className="auth-button">Register</div>
          </Link>
        )}
      </div>
    </>
  );
}

//old admin menu
// eslint-disable-next-line no-lone-blocks
{
  /* <HStack spacing="24px">
          {isAuthenticated && admin && (
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
        </HStack> */
}
