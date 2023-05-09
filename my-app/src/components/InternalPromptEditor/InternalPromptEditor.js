import React, { useEffect, useState } from "react";
import apiClient from "../../instance/config";
import { Button, Stack, Textarea, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export function InternalPromptEditor(props) {
  const { promptContent, setPromptContent, havePrompt, promptid } = props;
  const toast = useToast();
  console.log("this is the promptcontent", promptContent);
  console.log(
    "internal Date",
    new Date(localStorage.getItem("InternalDate"))
      .toLocaleDateString()
      .replace(/\//g, "-")
  );

  const handleChange = (textValue) => {
    setPromptContent(textValue.target.value);
  };

  const handleSubmit = async (e) => {
    if (havePrompt) {
      await apiClient
        .put(`/prompt/${promptid}`, {
          promptDescription: promptContent,
        })
        .then((response) => {
          console.log(response);
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
        });
    } else {
      const dateTime = new Date(localStorage.getItem("InternalDate"))
        .toLocaleDateString()
        .replace(/\//g, "-");
      await apiClient
        .post(`/prompt/create/${dateTime}`, {
          promptDescription: promptContent,
        })
        .then((response) => {
          console.log(response);
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
        });
    }
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
        <ArrowForwardIcon />
      </Button>
    </FormControl>
  );
}
