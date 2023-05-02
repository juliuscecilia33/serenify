import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import "./CreatePost.css";
import { Button, Stack, Textarea, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export function CreatePost({ promptid, showPencil, setShowPencil }) {
  const [postDescription, setPostDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const defaultHelperText = "Share your thoughts~~~";
  const [helperText, setHelperText] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [isValid, setIsVaild] = useState(true);
  const [moreThan500, setMoreThan500] = useState(false);
  const toast = useToast();
  //const [toastText, setToastText] = useState("Successfully Post~^_^~");
  const maxLength = 500;
  //   const [userid, setUserid] = useState();

  const handleChange = (textValue) => {
    setPostDescription(textValue.target.value);
    if (textValue.target.value.length <= maxLength) {
      setIsVaild(true);
      if (textValue.target.value.length === maxLength) {
        setHelperText("No more Characters~~~");
      } else {
        setHelperText(defaultHelperText);
      }
      setWordCount(textValue.target.value);
      setMoreThan500(false);
    } else {
      setIsVaild(false);
      setHelperText("Exceeded Character Limitation T_T");
      setMoreThan500(true);
      toast({
        title: "oops *_*",
        description: "Exceeded Character Limitation T_T",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const keyDownHandler = async (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  // useEffect(() => {

  //   document.addEventListener("keydown", keyDownHandler());
  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler());
  //   };
  // }, []);

  const handleSubmit = async (e) => {
    try {
      if (isValid) {
        await apiClient
          .post(
            "/posts/create",
            {
              postDescription: postDescription,
              attachment: attachment,
              userid: localStorage.getItem("userid"),
              promptid: promptid,
            }
            //console.log(localStorage.getItem("userid"))
          )
          .then((response) => {
            console.log("response successful: ", response);
          })
          .catch((error) => {
            console.error("error from handle submit: ", error.message);
          });

        toast({
          title: "Yeah, a new post~",
          description: "Your post was successfully posted!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setShowPencil(true);
      } else {
        toast({
          title: "Oops",
          description: JSON.stringify(helperText),
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container flex">
        <FormControl isInvalid={!isValid} onKeyPress={keyDownHandler}>
          <FormLabel htmlFor="your-thought">
            <Textarea
              placeholder="Leave your thoughts here.."
              onChange={handleChange}
              value={postDescription}
              resize={"none"}
              errorBorderColor="red"
            />
            <span style={{ color: moreThan500 ? "red" : "" }}>
              {`characters: ${wordCount.length}/${maxLength}`}
            </span>

            {isValid && <FormHelperText>{helperText}</FormHelperText>}

            <FormErrorMessage>{helperText}</FormErrorMessage>
            <Button
              colorScheme="teal"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </FormLabel>
        </FormControl>
      </div>
    </div>
  );
}
