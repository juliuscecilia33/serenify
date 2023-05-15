import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "../Register/Register.css";
import toplayer from "../../images/toplayer.png";
import { Authentication } from "../../context/Authentication";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/logo2.png";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ListItem,
  UnorderedList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { NavbarVTwo } from "../../components";
import { CommunityRule } from "../../components/CommunityRule/CommunityRule";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import apiClient from "../../instance/config";
import { modalTheme } from "./modalTheme";

export function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setAuth, admin, setAdmin } =
    useContext(Authentication);
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
  const [agreeCommunityRule, setAgreeCommunityRule] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePopover = (e) => {
    if (!userPassword) {
      setShowPop(true);
    }
  };

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      //.then((result) => {
      //if (result) {
      const userCred = res.user;
      if (userCred) {
        auth.currentUser
          .getIdToken(true)
          .then(function (idToken) {
            apiClient
              .post("users/firebase/login", { token: idToken })
              .then((response) => {
                console.log("login user response", response.data);
                if (response.data.userid) {
                  localStorage.setItem("userid", response.data.userid);
                  setAuth(true);
                  setLoading(false);
                  if (response.data.isadmin === true) {
                    localStorage.setItem("isAdmin", response.data.isadmin);
                    setAdmin(true);
                  } else {
                    setAdmin(false);
                  }
                } else {
                  setAuth(false);
                  setLoading(false);
                }

                toast({
                  title: "You are Logged in!",
                  description: "You successfully logged in! :D",
                  status: "success",
                  duration: 2500,
                  isClosable: true,
                });

                navigate(ROUTES.HOMEVTWO);
              });
          })
          .catch(function (error) {
            // Handle error
            console.err(error.message);
          });
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (userConfirmPassword !== userPassword) {
      console.error("Passwords don't match!");
      return toast({
        title: "Passwords do not match...",
        description: "Please check the password format ε(´סּ︵סּ)з",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }

    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (!userPassword.match(paswd)) {
      return toast({
        title: "Something Wrong...",
        description: "Please check the password format ε(´סּ︵סּ)з",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }

    // verify all inputs

    const appBody = {
      useremail: userEmail,
      userpassword: userPassword,
    };

    axios
      .post(`${process.env.REACT_APP_BACKENDURL}users/register`, appBody)
      .then((response) => {
        console.log("axios request called");

        console.log("login user response", response.data);
        if (response.data.userid) {
          localStorage.setItem("userid", response.data.userid);
          setAuth(true);
          setLoading(false);
        } else {
          setAuth(false);
          setLoading(false);
        }

        toast({
          title: "Welcome!",
          description: "Account Successfully Created! ( ´◔ ω◔`) ノシ",
          status: "success",
          duration: 3500,
          isClosable: true,
        });

        navigate(ROUTES.PROMPT);
      })
      .catch((error) => {
        toast({
          title: "Oops (°Ω°)/",
          description: `${error.response.data}`,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <NavbarVTwo />
      <div className="signup-signup">
        <div className="signup-content">
          <div className="signup-b">
            <h1 className="signup-text-wrapper">Register:</h1>
          </div>

          <div className="signup-b-2">
            <input
              className="signup-text-wrapper-2"
              placeholder="Email"
              onChange={(e) => {
                setUserEmail(e.target.value);
                setShowPop(false);
              }}
            />
            {!userPassword && (
              <div className="password-format-announcement">
                Your password should be set to 6 to 20 characters which contain
                at least one numeric digit and a special character ٩(^‿^)۶
              </div>
            )}
            <input
              onChange={(e) => {
                setUserPassword(e.target.value);
                setShowPop(false);
              }}
              className="signup-text-wrapper-2"
              placeholder="Password"
              type="Password"
              onClick={(e) => handlePopover(e)}
            />
            <input
              onChange={(e) => {
                setUserConfirmPassword(e.target.value);
                setShowPop(false);
              }}
              className="signup-text-wrapper-2"
              placeholder="Confirm Password"
              type="Password"
            />

            <div>
              <span>
                Please Read and Agree the Privacy Policy and Serenify's
                Community Guideline First ᕙ(`▽´)ᕗ
              </span>
              {!agreePrivacyPolicy ? (
                <h3>
                  <button onClick={onOpen}>
                    <u>Privacy Policy</u>
                  </button>
                </h3>
              ) : (
                <h3>
                  ✔
                  <button onClick={onOpen}>
                    <u>Privacy Policy</u>
                  </button>
                </h3>
              )}
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                colorScheme="yellow"
                scrollBehavior="inside"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Privacy Policy</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <div>
                      <div>
                        This privacy notice for Young Leaders Program, describes
                        how and why we might collect, store, and use your
                        information when you use our services, such as when you:
                      </div>

                      <div>
                        Visit our website, or any website of ours that links to
                        this privacy notice
                      </div>
                      <div>
                        Engage with us in other related ways, including any
                        sales, marketing, or events Questions or concerns?
                        Reading this privacy notice will help you
                      </div>
                      <div>
                        What personal information do we process? When you visit,
                        use, or navigate our Services, we may process personal
                        information depending on how you interact with the Young
                        Leaders Program and the Services, the choices you make,
                        and the products and features you use.{" "}
                      </div>
                      <div>
                        What information do we collect? We collect personal
                        information that you provide to us. We collect email
                        addresses and passwords.{" "}
                      </div>
                      <div>
                        Do we process any sensitive personal information? We do
                        not process sensitive personal information.{" "}
                      </div>
                      <div>
                        Do we receive any information from third parties? We do
                        not receive any information from third parties. Which
                        parties do we share personal information with? We do not
                        share your personal information with third parties.{" "}
                      </div>
                      <div>
                        How do we process your information? We process your
                        information to provide, improve, and administer our
                        Services, communicate with you, for security and fraud
                        prevention, and to comply with law. We may also process
                        your information for other purposes with your consent
                        and only when we have a valid legal reason to do so.{" "}
                      </div>
                      <div>
                        How long do we keep your information? We keep your
                        information for as long as necessary to fulfill the
                        purposes outlined in this privacy notice, unless a
                        longer retention period is required or permitted by law.
                        No purpose in this notice will require us keeping your
                        information for longer than the period of time in which
                        users have an account with us.
                      </div>
                      <div>
                        What are your rights? Depending on where you are located
                        geographically, the applicable privacy law may mean you
                        have certain rights regarding your personal information.{" "}
                      </div>
                      <div>
                        How do you exercise your rights? The easiest way to
                        exercise your rights is by contacting us at
                        serenify.platform@outlook.com. We will consider and act
                        upon any request in accordance with applicable data
                        protection laws.
                      </div>
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={(e) => {
                        setAgreePrivacyPolicy(true);
                        onClose();
                      }}
                    >
                      Agree
                    </Button>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <CommunityRule
                agreeCommunityRule={agreeCommunityRule}
                setAgreeCommunityRule={setAgreeCommunityRule}
              />
            </div>
            <Link to={ROUTES.LOGIN}>
              <h3 className="signup-text-wrapper-4">
                Already have an account? <u>Log in here!</u>
              </h3>
            </Link>
            <div className="google-login">
              Sign in with your&nbsp;
              <button onClick={signInWithGoogle}>
                <u>Google</u>
              </button>
              &nbsp;account
            </div>
            {agreeCommunityRule && agreePrivacyPolicy && (
              <button
                onClick={(e) => handleRegister(e)}
                className="signup-text-wrapper-3"
              >
                -&gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
