import React, { useEffect, useState } from "react";
import apiClient from "../../instance/config";
import { Button, Stack, Textarea, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export function InternalPromptEditor(props) {
  const {
    promptContent,
    setPromptContent,
    havePrompt,
    promptid,
    setPromptSubmitted,
    promptSubmitted,
    setHavePrompt,
  } = props;
  const toast = useToast();
  console.log("this is the promptcontent", promptContent);
  console.log(
    "this is the localStorage Time",
    localStorage.getItem("internalDate")
  );
  const dateTimee = new Date(localStorage.getItem("internalDate"))
    .toLocaleDateString()
    .replace(/\//g, "-");
  console.log("this is the internal date:", dateTimee);

  const handleChange = (textValue) => {
    setPromptContent(textValue.target.value);
  };

  useEffect(() => {
    if (havePrompt === false) {
      setPromptContent("");
    }
  }, [havePrompt, promptSubmitted, localStorage.getItem("internalDate")]);

  const handleSubmit = async (e) => {
    console.log("haveprompt inside handle submit", havePrompt);
    console.log("prompt content inside handle submit", promptContent);
    if (!promptContent) {
      return toast({
        title: "ohh nooooo",
        description: "You cannot post empty prompt...",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }

    if (havePrompt && promptContent != null) {
      await apiClient
        .put(`/prompt/${promptid}`, {
          promptDescription: promptContent,
        })
        .then((response) => {
          console.log(response);
          setPromptSubmitted(!promptSubmitted);
          toast({
            title: "new Prompt",
            description: "You have successfully post/change a new prompt",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("error from handle submit: ", error.message);
          toast({
            title: "ohh nooooo",
            description: "You cannot post empty prompt...",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
        });
    } else {
      await apiClient
        .post(`/prompt/create/${dateTimee}`, {
          promptDescription: promptContent,
        })
        .then((response) => {
          console.log(response);
          setPromptSubmitted(!promptSubmitted);
          setHavePrompt(!havePrompt);
          toast({
            title: "new Prompt",
            description: "You have successfully post/change a new prompt",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("error from handle submit: ", error.message);
          toast({
            title: "ohh nooooo",
            description: "You cannot post empty prompt...",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
        });
    }
  };

  return (
    <FormControl>
      <textarea
        onChange={(textValue) => handleChange(textValue)}
        value={promptContent}
        resize={"none"}
        errorBorderColor="red"
        className="post-input"
        placeholder="Type prompt here..."
      />
      <button
        className="selection-div"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        -&gt;
      </button>
    </FormControl>
  );
}
