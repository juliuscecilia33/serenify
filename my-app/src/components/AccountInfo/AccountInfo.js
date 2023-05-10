import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
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
  const { userEmail, userInformation, userPassword } = props;
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
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  //   useEffect(() => {
  //     if (props.userInformation) {
  //       setUserInfo(userInfo);
  //     }
  //   }, []);
  const handleChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };

  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async () => {
    if (password1 && password2 && password1 === password2) {
      setUserpassword(password1);
      await apiClient
        .put(`/user/${localStorage.getItem("userid")}/changePassword`, {
          userpassword: userPassword,
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
        });
    } else {
    }
  };
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
          **************
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
            <FormControl isRequired>
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
                    {show1 ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mt={4} isInvalid={isError} isRequired>
              <FormLabel>Type Again: </FormLabel>

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
                    {show2 ? <ViewOffIcon /> : <ViewIcon />}
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
