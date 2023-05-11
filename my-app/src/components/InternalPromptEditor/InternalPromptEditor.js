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
    if (havePrompt) {
      await apiClient
        .put(`/prompt/${promptid}`, {
          promptDescription: promptContent,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("error from handle submit: ", error.message);
        });
    } else {
      await apiClient
        .post(`/prompt/create/${dateTimee}`, {
          promptDescription: promptContent,
        })
        .then((response) => {
          console.log(response);
          setHavePrompt(!havePrompt);
        })
        .catch((error) => {
          console.error("error from handle submit: ", error.message);
        });
    }

    setPromptSubmitted(!promptSubmitted);
    toast({
      title: "new Prompt",
      description: "You have successfully post/change a new prompt",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <FormControl>
      <Textarea
        onChange={(textValue) => handleChange(textValue)}
        value={promptContent}
        resize={"none"}
        errorBorderColor="red"
      />
      <FormHelperText>Edit or Set a Prompt for This Day</FormHelperText>

      <Button
        colorScheme="teal"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        -&gt;
      </Button>
    </FormControl>
  );
}
