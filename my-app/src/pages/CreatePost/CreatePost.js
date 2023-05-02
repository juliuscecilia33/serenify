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

  const keyDownHandler = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // 👇️ call submit function here
      await handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler());
    return () => {
      document.removeEventListener("keydown", keyDownHandler());
    };
  }, []);

  const handleSubmit = async (e) => {
    try {
      if (isValid) {
        await apiClient
          .post("/posts/create", {
            postDescription: postDescription,
            attachment: attachment,
            userid: "",
            promptid: promptid,
          })
          .then((response) => {
            toast({
              title: "Account created.",
              description: response,
              status: "success",
              duration: 2500,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error(error.message);
          });

        setShowPencil(true);
      } else {
        toast({
          title:
            "You typed too much bitch, get ur ass back and change your shit and then try",
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
      <div className="container">
        <FormControl isInvalid={!isValid}>
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

            {isValid && (
              <FormHelperText id="your-thought-hepler">
                {helperText}
              </FormHelperText>
            )}

            <FormErrorMessage>{JSON.stringify(helperText)}</FormErrorMessage>
            <Button onClick={handleSubmit}>
              <ArrowForwardIcon />
            </Button>
          </FormLabel>
        </FormControl>
      </div>
    </div>
  );
}
