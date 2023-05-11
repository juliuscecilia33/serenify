import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  InputRightElement,
  InputGroup,
  useToast,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

export function AccountInfo(props) {
  const {
    userEmail,
    userInformation,
    userPassword,
    isSubmitted,
    setIsSubmitted,
  } = props;
  //const [userInfo, setUserInfo] = useState();
  //   console.log("userInfo in component:", userInformation);
  //   console.log("userEmail:", userEmail);
  //   console.log("userpassword", userPassword);
  //console.log("userInfo email:", userInfo.useremail);
  //   const userEmail2 = userInformation.useremail;
  //   console.log("useremail2:", userEmail2);
  const [userpassword, setUserpassword] = useState(userPassword);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();
  console.log("userPassword 刚开始", userpassword);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangePassword1 = (e) => {
    setIsError(false);
    setPassword1(e.target.value);
  };

  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    try {
      if (
        password1 != null &&
        password2 != null &&
        password1 === password2 &&
        password1 != userpassword
      ) {
        console.log("password1", password1);
        console.log("password2", password2);
        setUserpassword(password1);
        await apiClient
          .put(`/users/changePassword/${localStorage.getItem("userid")}`, {
            userpassword: userpassword,
          })
          .then((res) => {
            console.log(res);
            toast({
              title: "Successfully Change the Password",
              description: "You have successfully change your password",
              status: "success",
              duration: 2500,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.err(err.message);
          });

        setIsSubmitted(!isSubmitted);
      } else if (password1 == null || password2 == null) {
        console.log("password1", password1);
        console.log("password2", password2);
        setIsError(true);
        toast({
          title: "Empty Password",
          description: "You cannot change to empty password...",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      } else if (
        password1 != null &&
        password2 != null &&
        password1 === password2 &&
        password1 === userpassword
      ) {
        toast({
          title: "Ooops...",
          description: "You are setting up the same password",
          status: "warning",
          duration: 2500,
          isClosable: true,
        });
      } else {
        setIsError(true);
        toast({
          title: "Something Wrong",
          description:
            "Check your password inputs...Maybe they do not match or invaild password setting...",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("userpassword:", userpassword);
    setUserpassword(userpassword);
  }, [userpassword, isSubmitted]);

  return (
    <div className="profile-page-b-3">
      <h1 className="profile-page-account-info-email-helloworld-uw-edu-password">
        <span className="profile-page-text-wrapper-7">
          Account
          <br />
          Info:
          <br />
        </span>
        <span className="profile-page-text-wrapper-8">
          <br />
          Email: <br />
        </span>
        <span className="profile-page-text-wrapper-9">
          {userEmail}
          <br />
          <br />
        </span>
        <span className="profile-page-text-wrapper-8">
          Password:
          <br />
        </span>
        <span className="profile-page-text-wrapper-9">
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              isReadOnly
              value={userPassword}
              variant="unstyled"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <br />
        </span>
      </h1>
      <p className="profile-page-wake-me-up-if-you-want-to-change-it-zzzz">
        <span className="profile-page-text-wrapper-10">
          Wake me up if you want to change it.
          <br />
        </span>
        <Button onClick={onOpen}>
          <span className="profile-page-text-wrapper-3">(￣ρ￣)..zzZZ</span>
        </Button>
      </p>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError} isRequired>
              <FormLabel>New Password: </FormLabel>
              <InputGroup>
                <Input
                  placeholder="NewPassword"
                  type={show1 ? "text" : "password"}
                  value={password1}
                  onChange={(e) => handleChangePassword1(e)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShow1(!show1)}
                  >
                    {show1 ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mt={4} isInvalid={isError} isRequired>
              <FormLabel>Comfirm Your New Password: </FormLabel>

              <InputGroup>
                <Input
                  placeholder="Type Again"
                  type={show2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => handleChangePassword2(e)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShow2(!show2)}
                  >
                    {show2 ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
                {!isError && (
                  <FormErrorMessage>Password does not match</FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Change Password
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}